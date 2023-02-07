const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/users/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const userList = data.users

    const user = userList.find(u => u.id === id)
    if (user == null || user.deleted === true) {
      ctx.status = 404
      return
    }

    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      mobile: user.mobile,
      address: user.address,
      createdAt: user.createdAt,
    }
  })
})

