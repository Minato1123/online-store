const { defineRoute, getUserIdByToken } = require('../utils')

module.exports = defineRoute((router, data, tokenMap) => {
  router.post('/payment', (ctx) => {
    const userId = getUserIdByToken(ctx.request.headers['access-token'], tokenMap)
    const paymentData = ctx.request.body
    const paymentList = data.payment

    const paymentId = paymentList.length > 0 ? paymentList[paymentList.length - 1].id + 1 : 1
    paymentList.push({
      id: paymentId,
      userId,
      ...paymentData,
    })
    ctx.status = 201
    ctx.response.body = {}
  })
})

