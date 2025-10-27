import type { AIMessage } from '../types'
import { openai } from './ai'

export async function runLLM({
  model = 'gpt-5-nano',
  messages,
  temperature = 1,
}: {
  messages: AIMessage[]
  temperature?: number
  model?: string
}) {
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
  })

  return response.choices[0].message
}
