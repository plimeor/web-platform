import { useCallback, useState } from 'react'
import { useApi } from './use-api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export function useChat(conversationId?: string) {
  const api = useApi()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>(
    conversationId
  )

  const loadMessages = useCallback(
    async (convId: string) => {
      setIsLoading(true)
      setError(null)

      const { data, error: apiError } = await api.api.conversations({ id: convId }).messages.get()

      if (apiError || !data) {
        setError('Failed to load messages')
        setIsLoading(false)
        return
      }

      if ('messages' in data) {
        setMessages(
          data.messages.map(
            (m: { id: string; role: 'user' | 'assistant'; content: string; createdAt: Date }) => ({
              ...m,
              createdAt: m.createdAt.toString()
            })
          )
        )
      }
      setCurrentConversationId(convId)
      setIsLoading(false)
    },
    [api]
  )

  const sendMessage = useCallback(
    async (content: string) => {
      setIsLoading(true)
      setError(null)

      const { data, error: apiError } = await api.api.chat.send.post({
        conversationId: currentConversationId,
        content
      })

      if (apiError || !data) {
        setError('Failed to send message')
        setIsLoading(false)
        return null
      }

      if (!('userMessage' in data)) {
        setError('Failed to send message')
        setIsLoading(false)
        return null
      }

      const userMsg: Message = {
        ...data.userMessage,
        createdAt: data.userMessage.createdAt.toString()
      }
      const assistantMsg: Message = {
        ...data.assistantMessage,
        createdAt: data.assistantMessage.createdAt.toString()
      }

      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setCurrentConversationId(data.conversationId)
      setIsLoading(false)

      return data.conversationId
    },
    [api, currentConversationId]
  )

  return {
    messages,
    isLoading,
    error,
    currentConversationId,
    loadMessages,
    sendMessage
  }
}
