// tests/index.test.ts
import { describe, it, expect } from 'vitest'
import app, { PORT, rootDir } from '../src/index'

describe('Hono app', () => {
  it('should return Hello World at the root path', async () => {
    const request = new Request('http://localhost:' + PORT + rootDir + '/root')

    const response = await app.request(request)
    expect(response.status).toBe(200)
    const text = await response.text()
    const validResponses = { message: 'Hello, World!' }
    expect(text).toBe(JSON.stringify(validResponses))
  })
})
