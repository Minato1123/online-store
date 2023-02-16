const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/orders', (ctx) => {
    const serialNumber = ctx.query.serialNumber
    const orderList = data.orders

    if (ctx.query.status) {
      const userId = parseInt(ctx.query.userId)
      ctx.response.body = orderList
        .filter(order => order.userId === userId && order.status === ctx.query.status)
        .map((order) => {
          return {
            serialNumber: order.serialNumber,
          }
        })
      return
    }
    ctx.response.body = orderList.find(order => order.serialNumber === serialNumber)
  })
})

