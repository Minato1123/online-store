const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/orders', (ctx) => {
    const serialNumber = ctx.query.serialNumber
    const orderList = data.orders

    ctx.response.body = orderList.find(order => order.serialNumber === serialNumber)
  })
})

