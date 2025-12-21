import { asc, eq } from 'drizzle-orm'
import { InternalServerError } from 'elysia'
import { db } from '../client'
import { type Message, messages, type NewMessage } from '../schema'

export async function getMessagesByConversationId(conversationId: string): Promise<Message[]> {
  return db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(asc(messages.createdAt))
}

export async function createMessage(data: NewMessage): Promise<Message> {
  const [message] = await db.insert(messages).values(data).returning()
  if (!message) {
    throw new InternalServerError('Failed to create message')
  }
  return message
}

export async function createMessages(data: NewMessage[]): Promise<Message[]> {
  return db.insert(messages).values(data).returning()
}
