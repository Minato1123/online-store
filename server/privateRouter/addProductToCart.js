const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.post('/cartItems', (ctx) => {
    const { userId, productId, specificationId, amount } = ctx.request.body
    const cartItemList = data.cartItems

    const existedCartItem = cartItemList.find(p => p.userId === userId && p.productId === productId && p.specificationId === specificationId)
    if (existedCartItem != null) {
      existedCartItem.amount += amount
      ctx.status = 201
      ctx.response.body = {}
      return
    }

    const cartItemId = cartItemList.length > 0 ? cartItemList[cartItemList.length - 1].id + 1 : 1

    cartItemList.push({
      id: cartItemId,
      userId,
      productId,
      specificationId,
      amount,
    })
    ctx.status = 201
    ctx.response.body = {}
  })
})

