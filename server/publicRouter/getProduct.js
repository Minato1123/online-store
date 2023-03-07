import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/products/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const productList = data.products

    const product = productList.find(u => u.id === id)
    if (product == null) {
      ctx.status = 404
      return
    }

    ctx.response.body = product
  })
})

