import { t } from 'elysia'

export namespace MessageModel {
  export const params = t.Object({
    id: t.String()
  })

  export type params = typeof params.static
}
