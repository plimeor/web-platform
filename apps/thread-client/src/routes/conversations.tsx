import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useApi } from '@/hooks/use-api'

interface Conversation {
  id: string
  title: string | null
  createdAt: string
}

export function ConversationsPage() {
  const api = useApi()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await api.api.conversations.get()
      if (!error && data && 'conversations' in data) {
        setConversations(
          data.conversations.map((c: { id: string; title: string | null; createdAt: Date }) => ({
            ...c,
            createdAt: c.createdAt.toString(),
          }))
        )
      }
      setIsLoading(false)
    }
    load()
  }, [api])

  if (isLoading) {
    return <div style={{ padding: '1rem' }}>Loading...</div>
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Conversations</h1>
        <Link
          to="/chat"
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          New Chat
        </Link>
      </div>
      {conversations.length === 0 ? (
        <p>No conversations yet. Start a new chat!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {conversations.map((conv) => (
            <li key={conv.id} style={{ marginBottom: '0.5rem' }}>
              <Link
                to={`/chat/${conv.id}`}
                style={{
                  display: 'block',
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <strong>{conv.title || 'Untitled'}</strong>
                <br />
                <small style={{ color: '#666' }}>
                  {new Date(conv.createdAt).toLocaleDateString()}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
