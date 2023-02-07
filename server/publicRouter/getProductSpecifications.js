const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/productSpecifications', (ctx) => {
    const productId = parseInt(ctx.query.productId)
    const allProductSpecificationList = data.productSpecifications

    const productSpecificationList = allProductSpecificationList.filter(u => u.productId === productId)
    if (productSpecificationList == null) {
      ctx.status = 404
      return
    }

    ctx.response.body = productSpecificationList
  })
})

