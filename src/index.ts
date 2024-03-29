import { serve } from '@hono/node-server'
import { Hono, Context } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from '@/routes/user'
import 'dotenv/config'

export const PORT = Number(process.env.PORT) || 3001
const app = new Hono()

// Allowed Origins
const allowedOrigins: string[] = []
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push('https://example.com')
} else {
  allowedOrigins.push('http://localhost:3000')
  allowedOrigins.push('http://localhost:4200')
  for (let i = 0; i < 10; i++) {
    allowedOrigins.push(`http://localhost:1900${i}`)
  }
}

// CORS Options
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return origin
      } else {
        return null
      }
    },
  }),
)

// This rootDir name is used to Load Balancer and Reverse Proxy
// Please do not change this name
export const rootDir = '/sql-user-db'

app.route(rootDir + '/users', userRouter)

app.get(rootDir, (c: Context) => {
  return c.json({ message: 'Hello, World!' })
})

app.get(`${rootDir}/root`, async (c) => {
  return c.json({ message: 'Hello, World!' })
})

console.log(`Server is running on port http://localhost:${PORT}${rootDir}`)

serve({
  fetch: app.fetch,
  port: PORT,
})

export default app
