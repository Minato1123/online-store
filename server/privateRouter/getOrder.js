import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/orders', (ctx) => {
    const serialNumber = ctx.query.serialNumber
    const orderList = data.orders

    if (ctx.query.status) {
      const userId = parseInt(ctx.query.userId)
      ctx.response.body = orderList.filter(order => order.userId === userId && order.status === ctx.query.status)
      return
    }
    ctx.response.body = orderList.find(order => order.serialNumber === serialNumber)
  })
})

