import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.post('/followItems', (ctx) => {
    const { userId, productId } = ctx.request.body
    const followItemList = data.followItems
    const followItemId = followItemList.length > 0 ? followItemList[followItemList.length - 1].id + 1 : 1

    followItemList.push({
      id: followItemId,
      userId,
      productId,
    })
    ctx.status = 201
    ctx.response.body = {}
  })
})

