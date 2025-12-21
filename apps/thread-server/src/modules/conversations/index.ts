import { Elysia } from 'elysia'
import { requireAuth } from '../auth'
import { ConversationModel } from './model'
import { ConversationService } from './service'

export const conversations = new Elysia({ prefix: '/api/conversations' })
  .use(requireAuth)
  .get('/', async ({ userId }) => ConversationService.getAllConversations(userId))
  .post('/', async ({ userId, body }) => ConversationService.createConversation(userId, body), {
    body: ConversationModel.createBody
  })
  .get(
    '/:id',
    async ({ userId, params }) => ConversationService.getConversation(userId, params.id),
    {
      params: ConversationModel.params
    }
  )
  .patch(
    '/:id',
    async ({ userId, params, body }) =>
      ConversationService.updateConversation(userId, params.id, body),
    {
      params: ConversationModel.params,
      body: ConversationModel.updateBody
    }
  )
