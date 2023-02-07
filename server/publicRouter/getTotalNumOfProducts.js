const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/numOfProducts', (ctx) => {
    const productList = [...data.products]
    let numOfProducts = productList.length

    if (ctx.query.categoryId)
      numOfProducts = productList.filter(p => p.categoryId === parseInt(ctx.query.categoryId)).length
    else if (ctx.query.subCategoryId)
      numOfProducts = productList.filter(p => p.subCategoryId === parseInt(ctx.query.subCategoryId)).length

    ctx.response.body = { numOfProducts }
  })
})

