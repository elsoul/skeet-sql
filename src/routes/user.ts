// src/routes/user.ts
import { Hono } from 'hono'
import { createUser, getUserById } from '@/models/user'

const userRouter = new Hono()

// Create User
userRouter.post('/', async (c) => {
  const json = (await c.req.raw.json()) as { uid: string }
  const uid = json.uid
  if (!uid || uid === '' || uid === undefined) {
    return c.json({
      status: 'error',
      message: 'uid is required',
    })
  }
  const userData = {
    uid,
  }
  const user = await createUser(userData)
  return c.json(user)
})

// Get User by ID
userRouter.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const user = await getUserById(id)
  return user ? c.json(user) : c.notFound()
})

export { userRouter }
