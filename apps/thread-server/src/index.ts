import { cors } from '@elysiajs/cors'
import { Elysia, InternalServerError, NotFoundError } from 'elysia'
import { chat } from './modules/chat'
import { conversations } from './modules/conversations'
import { messages } from './modules/messages'

const app = new Elysia()
  .use(cors())

  // Register all error types for type safety
  .error({
    NotFoundError,
    InternalServerError
  })

  // Global error handler
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'NotFoundError':
        set.status = 404
        return { error: error.message }

      case 'InternalServerError':
        set.status = 500
        console.error('Internal Server Error:', error)
        return { error: 'Internal server error' }

      case 'VALIDATION':
        set.status = 400
        return { error: 'Validation failed', details: error.message }

      case 'NOT_FOUND':
        set.status = 404
        return { error: 'Route not found' }

      case 'PARSE':
        set.status = 400
        return { error: 'Failed to parse request body' }

      default:
        set.status = 500
        console.error('Unexpected error:', error)
        return { error: 'Internal server error' }
    }
  })

  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
  .use(chat)
  .use(conversations)
  .use(messages)
  .listen(3000)

console.log(`🦊 Thread server running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app
