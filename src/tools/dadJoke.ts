import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

export const dadJokeToolDefinition = {
  name: 'dad_joke',
  description: 'Get a random dad joke to cheer someone up.',
  parameters: z.object({}),
}

export const dadJoke: ToolFn = async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  const data = await response.json()
  return data.joke
}
