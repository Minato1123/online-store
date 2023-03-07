import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/subCategories/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const subCategoryList = data.subCategories

    const subCategory = subCategoryList.find(u => u.id === id)
    if (subCategory == null) {
      ctx.status = 404
      return
    }

    ctx.response.body = subCategory
  })
})

