import { desc, eq } from 'drizzle-orm'
import { InternalServerError } from 'elysia'
import { db } from '../client'
import { type Conversation, conversations, type NewConversation } from '../schema'

export async function getConversationsByUserId(userId: string): Promise<Conversation[]> {
  return db
    .select()
    .from(conversations)
    .where(eq(conversations.userId, userId))
    .orderBy(desc(conversations.createdAt))
}

export async function getConversationById(id: string): Promise<Conversation | undefined> {
  const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id))
  return conversation
}

export async function createConversation(data: NewConversation): Promise<Conversation> {
  const [conversation] = await db.insert(conversations).values(data).returning()
  if (!conversation) {
    throw new InternalServerError('Failed to create conversation')
  }
  return conversation
}

export async function updateConversationTitle(id: string, title: string): Promise<Conversation> {
  const [conversation] = await db
    .update(conversations)
    .set({ title })
    .where(eq(conversations.id, id))
    .returning()

  if (!conversation) {
    throw new InternalServerError('Failed to update conversation')
  }

  return conversation
}
