const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/subCategories', (ctx) => {
    const categoryId = parseInt(ctx.query.categoryId)
    const subCategoriesList = data.subCategories.filter(subcategory => subcategory.categoryId === categoryId)

    ctx.response.body = subCategoriesList
  })
})

