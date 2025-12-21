import { treaty } from '@elysiajs/eden'
import type { App } from '@thread/server'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = treaty<App>(API_URL)

export function createAuthenticatedApi(getToken: () => Promise<string | null>) {
  return treaty<App>(API_URL, {
    onRequest: async (_path, options) => {
      const token = await getToken()
      if (token) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token}`)
        return { ...options, headers }
      }
    }
  })
}
