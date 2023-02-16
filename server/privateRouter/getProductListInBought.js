const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/boughtItems', (ctx) => {
    const boughtItemList = data.boughtItems
    const orderId = ctx.query.orderId
    ctx.response.body = boughtItemList.filter(item => item.orderId === orderId)
  })
})

