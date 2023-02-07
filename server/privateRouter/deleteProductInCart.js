const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.delete('/cartItems/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const cartItemList = data.cartItems
    const index = cartItemList.findIndex(item => item.id === id)

    if (index === -1) {
      ctx.status = 404
      return
    }

    cartItemList.splice(index, 1)
    ctx.response.body = {}
  })
})

