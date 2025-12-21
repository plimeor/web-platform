import { useEffect, useRef } from 'react'
import { ChatMessage } from './chat-message'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
      {messages.length === 0 && !isLoading && (
        <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
          Start a conversation by sending a message below.
        </div>
      )}
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isLoading && <div style={{ padding: '1rem', color: '#666' }}>Thinking...</div>}
      <div ref={bottomRef} />
    </div>
  )
}
