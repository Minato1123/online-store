const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/categories/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const categoryList = data.categories

    const category = categoryList.find(u => u.id === id)
    if (category == null) {
      ctx.status = 404
      return
    }

    ctx.response.body = category
  })
})

