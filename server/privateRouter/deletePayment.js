import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.delete('/payment/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const paymentList = data.payment
    const index = paymentList.findIndex(item => item.id === id)

    if (index === -1) {
      ctx.status = 404
      return
    }

    paymentList.splice(index, 1)
    ctx.response.body = {}
  })
})

