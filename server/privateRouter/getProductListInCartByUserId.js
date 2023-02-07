const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/cartItems', (ctx) => {
    const userId = parseInt(ctx.query.userId)
    const cartItemList = data.cartItems
    ctx.response.body = cartItemList.filter(item => item.userId === userId)
  })
})

