const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data, tokenMap) => {
  router.post('/logout', (ctx) => {
    const theToken = ctx.request.headers['access-token']

    if (theToken == null)
      return

    tokenMap.delete(theToken)
    ctx.status = 200
    ctx.response.body = {}
  })
})

