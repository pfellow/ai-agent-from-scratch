import type OpenAI from 'openai'
import {
  generateImage,
  generateImageToolDefinition,
} from './tools/generateImage'
import { reddit, redditToolDefinition } from './tools/reddit'
import { dadJoke, dadJokeToolDefinition } from './tools/dadJoke'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments),
  }
  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      const image = await generateImage(input)
      return image

    case dadJokeToolDefinition.name:
      return dadJoke(input)

    case redditToolDefinition.name:
      return reddit(input)

    default:
      return `Tool ${toolCall.function.name} not found. Do not attempt to use it.`
  }
}
