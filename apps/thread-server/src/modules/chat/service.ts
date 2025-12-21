import { InternalServerError, NotFoundError, ParseError } from 'elysia'
import { createConversation, getConversationById } from '@/db/queries/conversations'
import { createMessages } from '@/db/queries/messages'
import { getOrCreateUser, updateUserAgent } from '@/db/queries/users'
import type { AppUser } from '@/db/schema'
import { LettaAgentService } from '@/modules/letta-agent'
import type { ChatModel } from './model'

async function createUserAgent(user: AppUser) {
  const identity = await LettaAgentService.createIdentity(`user-${user.id}`)
  if (!identity.id) throw new InternalServerError('Failed to create identity')
  const agent = await LettaAgentService.createAgent({
    name: `thread-agent-${user.id}`,
    identityId: identity.id
  })
  await updateUserAgent(user.id, agent.id, identity.id)
  user.agentId = agent.id
}

export namespace ChatService {
  export async function sendMessage(userId: string, body: ChatModel.sendBody) {
    const { conversationId, content } = body

    const user = await getOrCreateUser(userId)

    // Create agent if user doesn't have one
    if (!user.agentId) {
      await createUserAgent(user)
    }

    // At this point, agentId must exist (either from DB or just created)
    if (!user.agentId) {
      throw new InternalServerError('Failed to create or retrieve agent for user')
    }

    // Get or create conversation
    let conversation = conversationId ? await getConversationById(conversationId) : null

    if (conversationId && !conversation) {
      throw new NotFoundError('Conversation not found')
    }

    if (!conversation) {
      conversation = await createConversation({
        userId: user.id,
        title: content.slice(0, 50)
      })
    }

    // Verify conversation belongs to user
    if (conversation.userId !== user.id) {
      throw new ParseError(new Error('User does not have permission to access this conversation'))
    }

    // Send message to Letta agent
    const assistantContent = await LettaAgentService.sendMessage({
      agentId: user.agentId,
      message: content
    })

    // Save both messages to database
    const [userMessage, assistantMessage] = await createMessages([
      {
        conversationId: conversation.id,
        role: 'user',
        content
      },
      {
        conversationId: conversation.id,
        role: 'assistant',
        content: assistantContent
      }
    ])

    return {
      conversationId: conversation.id,
      userMessage,
      assistantMessage
    }
  }
}
