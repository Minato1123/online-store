import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/productDescription', (ctx) => {
    const productId = parseInt(ctx.query.productId)
    const allProductDescriptionList = data.productDescription

    const productDescriptionList = allProductDescriptionList.filter(u => u.productId === productId)
    if (productDescriptionList == null) {
      ctx.status = 404
      return
    }

    ctx.response.body = productDescriptionList
  })
})

