const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/categories', (ctx) => {
    const categoryList = data.categories

    ctx.response.body = categoryList
  })
})

