import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/categories', (ctx) => {
    const categoryList = data.categories

    ctx.response.body = categoryList
  })
})

