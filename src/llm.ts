import type { AIMessage } from '../types'
import { openai } from './ai'
import { zodFunction } from 'openai/helpers/zod'

export async function runLLM({
  model = 'gpt-5-nano',
  messages,
  tools,
  temperature = 1,
}: {
  messages: AIMessage[]
  tools?: any[]
  temperature?: number
  model?: string
}) {
  const formattedTools = tools?.map(zodFunction) ?? []
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  return response.choices[0].message
}
