const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/payment', (ctx) => {
    const userId = parseInt(ctx.query.userId)
    const paymentList = data.payment

    if (ctx.query.type) {
      const type = ctx.query.type
      ctx.response.body = paymentList.filter(p => p.userId === userId && p.type === type)
      return
    }

    ctx.response.body = paymentList.filter(p => p.userId === userId)
  })
})

