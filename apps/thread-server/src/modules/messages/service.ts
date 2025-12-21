import { NotFoundError, ParseError } from 'elysia'
import { getConversationById } from '../../db/queries/conversations'
import { getMessagesByConversationId } from '../../db/queries/messages'
import { getOrCreateUser } from '../../db/queries/users'

export namespace MessageService {
  export async function getMessages(userId: string, conversationId: string) {
    const user = await getOrCreateUser(userId)
    const conversation = await getConversationById(conversationId)

    if (!conversation) {
      throw new NotFoundError('Conversation not found')
    }

    if (conversation.userId !== user.id) {
      throw new ParseError(new Error('User does not have permission to access this conversation'))
    }

    const messages = await getMessagesByConversationId(conversationId)
    return { messages }
  }
}
