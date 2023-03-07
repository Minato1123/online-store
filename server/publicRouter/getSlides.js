import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/slides', (ctx) => {
    ctx.response.body = data.slides
  })
})

