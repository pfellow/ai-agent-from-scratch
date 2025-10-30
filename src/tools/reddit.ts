import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

export const redditToolDefinition = {
  name: 'reddit',
  description: 'Get the latest posts from Reddit.',
  parameters: z.object({}),
}

export const reddit: ToolFn = async () => {
  const response = await fetch('https://www.reddit.com/r/popular/top.json')
  const data = await response.json()

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
