const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.delete('/followItems/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const followItemList = data.followItems

    const index = followItemList.findIndex(item => item.id === id)
    if (index !== -1) {
      followItemList.splice(index, 1)
      ctx.response.body = {}
    }
  })
})

