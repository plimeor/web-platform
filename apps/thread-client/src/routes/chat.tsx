import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatWindow } from '@/components/chat/chat-window'
import { useChat } from '@/hooks/use-chat'

export function ChatPage() {
  const { conversationId } = useParams()
  const navigate = useNavigate()
  const { messages, isLoading, error, loadMessages, sendMessage } = useChat(conversationId)

  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId)
    }
  }, [conversationId, loadMessages])

  const handleSend = async (content: string) => {
    const newConversationId = await sendMessage(content)
    if (newConversationId && !conversationId) {
      navigate(`/chat/${newConversationId}`, { replace: true })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatWindow messages={messages} isLoading={isLoading} />
      {error && <div style={{ color: 'red', padding: '0.5rem 1rem' }}>{error}</div>}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  )
}
