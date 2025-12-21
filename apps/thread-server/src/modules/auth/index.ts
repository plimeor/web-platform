import { Elysia } from 'elysia'
import { AuthService } from './service'

export const requireAuth = new Elysia({ name: 'require-auth' }).derive(
  { as: 'scoped' },
  async ({ headers, status }) => {
    const userId = await AuthService.getUserIdFromToken(headers.authorization)
    if (!userId) {
      return status(401)
    }
    return { userId }
  }
)
