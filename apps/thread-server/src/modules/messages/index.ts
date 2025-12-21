import { Elysia } from 'elysia'
import { requireAuth } from '../auth'
import { MessageModel } from './model'
import { MessageService } from './service'

export const messages = new Elysia({ prefix: '/api/conversations' })
  .use(requireAuth)
  .get(
    '/:id/messages',
    async ({ userId, params }) => MessageService.getMessages(userId, params.id),
    {
      params: MessageModel.params
    }
  )
