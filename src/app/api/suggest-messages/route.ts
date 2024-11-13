import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST () {
  try {
    const prompt = `
    Write a short story about a futuristic city where humans and AI live together harmoniously. 
    Describe the daily life of a person who works with AI to solve everyday problems. 
    Emphasize themes of collaboration, innovation, and community.
    `

    // Ask OpenAI for a streaming chat completion given the prompt
    //@ts-expect-error cannot find the openai
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      max_tokens: 400,
      stream: true,
      prompt
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message
        },
        { status }
      )
    } else {
      console.error('An unexpected error occurred', error)
      throw error
    }
  }
}
