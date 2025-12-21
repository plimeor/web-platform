import { Elysia } from 'elysia'
import { requireAuth } from '../auth'
import { ChatModel } from './model'
import { ChatService } from './service'

export const chat = new Elysia({ prefix: '/api/chat' })
  .use(requireAuth)
  .post('/send', async ({ userId, body }) => ChatService.sendMessage(userId, body), {
    body: ChatModel.sendBody
  })
