import { LettaClient } from '@letta-ai/letta-client'
import { InternalServerError } from 'elysia'

const LETTA_API_KEY = process.env.LETTA_API_KEY

if (!LETTA_API_KEY) {
  console.warn('LETTA_API_KEY not set - agent features will fail')
}

const lettaClient = new LettaClient({
  token: LETTA_API_KEY
})

export namespace LettaAgentService {
  export interface SendMessageOptions {
    agentId: string
    message: string
  }

  export async function sendMessage({ agentId, message }: SendMessageOptions): Promise<string> {
    const response = await lettaClient.agents.messages.create(agentId, {
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    })

    const assistantMessage = response.messages.find(
      (msg) => msg.messageType === 'assistant_message'
    )

    if (!assistantMessage || assistantMessage.messageType !== 'assistant_message') {
      throw new InternalServerError('No assistant response received')
    }

    const content = assistantMessage.content
    if (typeof content === 'string') {
      return content
    }
    if (Array.isArray(content)) {
      return content.map((c) => ('text' in c ? c.text : '')).join('')
    }
    return String(content)
  }

  export interface CreateAgentOptions {
    name: string
    identityId?: string
  }

  export async function createAgent({ name, identityId }: CreateAgentOptions) {
    const agent = await lettaClient.agents.create(
      identityId
        ? {
            name,
            model: 'openai/gpt-4o-mini',
            embedding: 'openai/text-embedding-3-small',
            identityIds: [identityId]
          }
        : {
            name,
            model: 'openai/gpt-4o-mini',
            embedding: 'openai/text-embedding-3-small'
          }
    )

    return agent
  }

  export async function createIdentity(name: string) {
    const identity = await lettaClient.identities.create({
      name,
      identityType: 'user',
      identifierKey: name
    })

    return identity
  }
}
