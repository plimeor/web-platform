import { verifyToken } from '@clerk/backend'

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY

if (!CLERK_SECRET_KEY) {
  console.warn('CLERK_SECRET_KEY not set - auth will fail')
}

export namespace AuthService {
  export async function getUserIdFromToken(authHeader: string | undefined): Promise<string | null> {
    if (!authHeader?.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.slice(7)

    if (!CLERK_SECRET_KEY) return null

    try {
      const payload = await verifyToken(token, {
        secretKey: CLERK_SECRET_KEY
      })
      return payload.sub
    } catch {
      return null
    }
  }
}
