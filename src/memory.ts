import { JSONFilePreset } from 'lowdb/node'
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type MessageWithMetadata = AIMessage & {
  id: string
  timestamp: string
}

interface Data {
  messages: MessageWithMetadata[]
}

export function addMetaData(message: AIMessage): MessageWithMetadata {
  return {
    ...message,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  }
}

export function removeMetaData(message: MessageWithMetadata): AIMessage {
  const { id, timestamp, ...rest } = message
  return rest
}

const defaultData: Data = { messages: [] }

async function getDb() {
  return await JSONFilePreset<Data>('db.json', defaultData)
}

export async function addMessages(messages: AIMessage[]) {
  const db = await getDb()
  const messagesWithMeta = messages.map(addMetaData)
  db.data.messages.push(...messagesWithMeta)
  await db.write()
}

export async function getMessages(): Promise<AIMessage[]> {
  const db = await getDb()
  return db.data.messages.map(removeMetaData)
}

export async function saveToolResponse(
  toolCallId: string,
  toolResponse: string
) {
  return await addMessages([
    { role: 'tool', content: toolResponse, tool_call_id: toolCallId },
  ])
}
