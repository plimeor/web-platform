interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '0.75rem 1rem',
          borderRadius: '1rem',
          background: isUser ? '#007bff' : '#f0f0f0',
          color: isUser ? 'white' : 'inherit',
        }}
      >
        <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
        <div
          style={{
            fontSize: '0.75rem',
            opacity: 0.7,
            marginTop: '0.25rem',
            textAlign: 'right',
          }}
        >
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
