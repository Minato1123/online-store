import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.delete('/users/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const userList = data.users

    const user = userList.find(u => u.id === id)
    if (user) {
      user.deleted = true
      ctx.response.body = {}
    }
  })
})

