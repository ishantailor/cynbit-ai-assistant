const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const OpenAI = require('openai')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json({ limit: '20kb' }))

if (!process.env.CENT_AI_KEY) {
  console.error('Missing CENT_AI_KEY in server/.env')
  process.exit(1)
}

const client = new OpenAI({
  apiKey: process.env.CENT_AI_KEY,
  baseURL: 'https://api.cent-ai.dev/v1'
})

app.get('/', (req, res) => {
  res.json({ message: 'Cynbit AI Assistant API is running!' })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Please enter a valid message.'
      })
    }

    if (
      message.length > 2000 ||
      !Array.isArray(history) ||
      history.length > 10
    ) {
      return res.status(400).json({
        error: 'Message or conversation history is too long.'
      })
    }

    const conversation = history
      .filter(item =>
        ['user', 'assistant'].includes(item.role) &&
        typeof item.content === 'string'
      )
      .map(item => ({
        role: item.role,
        content: item.content.slice(0, 2000)
      }))

    const response = await client.chat.completions.create({
      // Check Cent AI's model list/dashboard for the current free model ID.
      model: 'hy4-flash:free',
      messages: [
        {
          role: 'system',
          content: `You are Cynbit AI Assistant, a helpful website assistant.

Help visitors understand Cynbit's services, technology solutions, products,
and business offerings. Be professional, friendly, concise, and helpful.

Explain software development, AI automation, and cloud solutions when relevant.
Never invent prices, guarantees, client details, company policies, internship
openings, or contact information.

If you do not know a company-specific answer, say so politely and direct the
visitor to the official contact page.`
        },
        ...conversation,
        { role: 'user', content: message.trim() }
      ]
    })

    const reply = response.choices?.[0]?.message?.content

    if (!reply) {
      throw new Error('Cent AI returned an empty response.')
    }

    res.json({ reply })
  } catch (error) {
    console.error('Cent AI Error:', error.message)

    res.status(500).json({
      error: 'Sorry, something went wrong. Please try again.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})