import { useAuth } from '@clerk/clerk-react'
import { useMemo } from 'react'
import { createAuthenticatedApi } from '@/lib/api'

export function useApi() {
  const { getToken } = useAuth()

  const api = useMemo(() => createAuthenticatedApi(getToken), [getToken])

  return api
}
