import { NotFoundError, ParseError } from 'elysia'
import { getOrCreateUser } from '@/db/queries/users'
import {
  createConversation as dbCreateConversation,
  getConversationById,
  getConversationsByUserId,
  updateConversationTitle
} from '../../db/queries/conversations'
import type { ConversationModel } from './model'

export namespace ConversationService {
  export async function getAllConversations(userId: string) {
    const user = await getOrCreateUser(userId)
    const conversations = await getConversationsByUserId(user.id)
    return { conversations }
  }

  export async function createConversation(userId: string, body: ConversationModel.createBody) {
    const user = await getOrCreateUser(userId)
    const conversation = await dbCreateConversation({
      userId: user.id,
      title: body.title
    })
    return { conversation }
  }

  export async function getConversation(userId: string, conversationId: string) {
    const user = await getOrCreateUser(userId)
    const conversation = await getConversationById(conversationId)

    if (!conversation) {
      throw new NotFoundError('Conversation not found')
    }

    if (conversation.userId !== user.id) {
      throw new ParseError(new Error('User does not have permission to access this conversation'))
    }

    return { conversation }
  }

  export async function updateConversation(
    userId: string,
    conversationId: string,
    body: ConversationModel.updateBody
  ) {
    const user = await getOrCreateUser(userId)
    const conversation = await getConversationById(conversationId)

    if (!conversation) {
      throw new NotFoundError('Conversation not found')
    }

    if (conversation.userId !== user.id) {
      throw new ParseError(new Error('User does not have permission to access this conversation'))
    }

    const updated = await updateConversationTitle(conversationId, body.title)
    return { conversation: updated }
  }
}
