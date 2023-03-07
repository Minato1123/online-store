import { defineRoute } from '../utils'

export default defineRoute((router, data, tokenMap) => {
  router.post('/login', (ctx) => {
    const { email, password } = ctx.request.body
    const users = data.users
    const user = users.find(u => u.email === email && u.password === password)
    if (user == null) {
      ctx.status = 400
      return
    }

    for (const [key, value] of tokenMap) {
      if (value === user.id) {
        tokenMap.delete(key)
        break
      }
    }

    const token = `${Date.now()}`
    tokenMap.set(token, user.id)
    ctx.response.body = {
      token,
      userId: user.id,
    }
  })
})

