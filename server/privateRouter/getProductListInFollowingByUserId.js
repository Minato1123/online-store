import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/followItems', (ctx) => {
    const userId = parseInt(ctx.query.userId)
    const followingItemList = data.followItems.filter(item => item.userId === userId)

    if (ctx.query.currentPage && ctx.query.pageSize) {
      const { sortBy, orderBy } = ctx.query
      const currentPage = parseInt(ctx.query.currentPage)
      const pageSize = parseInt(ctx.query.pageSize)

      if (sortBy === 'id') {
        if (orderBy === 'asc')
          followingItemList.sort((a, b) => a.id - b.id)
        else if (orderBy === 'desc')
          followingItemList.sort((a, b) => b.id - a.id)
      }
      else if (sortBy === 'name') {
        if (orderBy === 'asc')
          followingItemList.sort((a, b) => a.name.localeCompare(b.name))
        else if (orderBy === 'desc')
          followingItemList.sort((a, b) => b.name.localeCompare(a.name))
      }
      else if (sortBy === 'price') {
        if (orderBy === 'asc')
          followingItemList.sort((a, b) => a.price - b.price)
        else if (orderBy === 'desc')
          followingItemList.sort((a, b) => b.price - a.price)
      }

      ctx.response.body = {
        productList: followingItemList.slice(pageSize * (currentPage - 1), currentPage * pageSize),
        pagination: {
          first: 1,
          prev: currentPage > 1 ? currentPage - 1 : null,
          next: currentPage < Math.ceil(followingItemList.length / pageSize) ? currentPage + 1 : null,
          last: Math.ceil(followingItemList.length / pageSize),
        },
      }
      return
    }

    ctx.response.body = followingItemList
  })
})

