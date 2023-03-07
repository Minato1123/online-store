import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/subCategories', (ctx) => {
    const categoryId = parseInt(ctx.query.categoryId)
    const subCategoriesList = data.subCategories.filter(subcategory => subcategory.categoryId === categoryId)

    ctx.response.body = subCategoriesList
  })
})

