import { t } from 'elysia'

export namespace ConversationModel {
  export const createBody = t.Object({
    title: t.Optional(t.String())
  })

  export type createBody = typeof createBody.static

  export const updateBody = t.Object({
    title: t.String()
  })

  export type updateBody = typeof updateBody.static

  export const params = t.Object({
    id: t.String()
  })

  export type params = typeof params.static
}
