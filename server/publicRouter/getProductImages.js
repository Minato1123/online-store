import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/productImages', (ctx) => {
    const productId = parseInt(ctx.query.productId)
    const allProductImageList = data.productImages

    const productImageList = allProductImageList.filter(u => u.productId === productId)
    if (productImageList == null) {
      ctx.status = 404
      return
    }

    ctx.response.body = productImageList
  })
})

