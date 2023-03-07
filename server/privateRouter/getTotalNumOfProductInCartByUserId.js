import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/numOfCartItems', (ctx) => {
    const userId = parseInt(ctx.query.userId)
    const cartItemList = data.cartItems
    const numOfCartItems = cartItemList.filter(item => item.userId === userId).reduce((acc, cur) => acc + cur.amount, 0)

    ctx.response.body = { numOfCartItems }
  })
})

