import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.patch('/cartItems/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const { amount } = ctx.request.body
    const cartItemList = data.cartItems

    cartItemList.find(item => item.id === id).amount = amount
    ctx.response.body = {}
  })
})

