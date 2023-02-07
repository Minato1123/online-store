const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.get('/slides', (ctx) => {
    ctx.response.body = data.slides
  })
})

