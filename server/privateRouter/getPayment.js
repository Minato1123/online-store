const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/payment/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const paymentList = data.payment

    const thePayment = paymentList.find(u => u.id === id)
    if (thePayment == null) {
      ctx.status = 404
      return
    }

    ctx.response.body = thePayment
  })
})

