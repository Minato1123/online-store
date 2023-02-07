const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/boughtItems', (ctx) => {
    const userId = parseInt(ctx.query.userId)
    if (ctx.query.orderId) {
      const orderId = ctx.query.orderId
      ctx.response.body = data.boughtItems.filter(item => item.userId === userId && item.orderId === orderId)
    }
    else if (ctx.query.status) {
      const status = ctx.query.status
      ctx.response.body = data.boughtItems.filter(item => item.userId === userId && item.status === status)
    }
    ctx.response.body = data.boughtItems.filter(item => item.userId === userId)
  })
})

