const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.patch('/users/:id', (ctx) => {
    const body = ctx.request.body
    const id = parseInt(ctx.params.id)
    const userList = data.users

    const user = userList.find(u => u.id === id)
    if (user == null || user.deleted === true) {
      ctx.status = 404
      return
    }

    if (body.oldPassword && body.newPassword) {
      if (user.password === body.oldPassword) {
        user.password = body.newPassword
        ctx.status = 200
      }
      else if (user.password !== body.oldPassword) {
        ctx.status = 400
      }
      else if (body.oldPassword === body.newPassword) {
        ctx.status = 400
      }
      return
    }

    if (body.name == null || body.email == null || body.birthday == null || body.mobile == null || body.address == null) {
      ctx.status = 400
      return
    }

    user.name = body.name
    user.email = body.email
    user.birthday = body.birthday
    user.mobile = body.mobile
    user.address = body.address
    ctx.status = 200
    ctx.response.body = {}
  })
})

