import { eq } from 'drizzle-orm'
import { InternalServerError } from 'elysia'
import { db } from '../client'
import { type AppUser, type NewAppUser, users } from '../schema'

export async function getUserByClerkId(clerkUserId: string): Promise<AppUser | undefined> {
  const [user] = await db.select().from(users).where(eq(users.clerkUserId, clerkUserId))
  return user
}

export async function createUser(data: NewAppUser): Promise<AppUser> {
  const [user] = await db.insert(users).values(data).returning()
  if (!user) {
    throw new InternalServerError('Failed to create user')
  }
  return user
}

export async function getOrCreateUser(clerkUserId: string): Promise<AppUser> {
  const existing = await getUserByClerkId(clerkUserId)
  if (existing) return existing
  return createUser({ clerkUserId })
}

export async function updateUserAgent(
  userId: string,
  agentId: string,
  lettaIdentityId: string
): Promise<AppUser> {
  const [user] = await db
    .update(users)
    .set({ agentId, lettaIdentityId })
    .where(eq(users.id, userId))
    .returning()

  if (!user) {
    throw new InternalServerError('Failed to update user agent')
  }

  return user
}
