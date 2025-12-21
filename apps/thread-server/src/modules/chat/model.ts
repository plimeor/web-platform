import { t } from 'elysia'

export namespace ChatModel {
  export const sendBody = t.Object({
    conversationId: t.Optional(t.String()),
    content: t.String({ minLength: 1 })
  })

  export type sendBody = typeof sendBody.static

  export const sendResponse = t.Object({
    conversationId: t.String(),
    userMessage: t.Object({
      id: t.String(),
      conversationId: t.String(),
      role: t.Literal('user'),
      content: t.String(),
      createdAt: t.Date()
    }),
    assistantMessage: t.Object({
      id: t.String(),
      conversationId: t.String(),
      role: t.Literal('assistant'),
      content: t.String(),
      createdAt: t.Date()
    })
  })

  export type sendResponse = typeof sendResponse.static
}
