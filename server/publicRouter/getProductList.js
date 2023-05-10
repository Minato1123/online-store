import { Fzf } from 'fzf'
import { defineRoute } from '../utils'

export default defineRoute((router, data) => {
  router.get('/products', (ctx) => {
    const { sortBy, orderBy } = ctx.query
    const currentPage = parseInt(ctx.query.currentPage)
    const pageSize = parseInt(ctx.query.pageSize)
    let productList = [...data.products]

    if (ctx.query.categoryId) {
      productList = productList.filter(p => p.categoryId === parseInt(ctx.query.categoryId))
    }
    else if (ctx.query.productId && ctx.query.subCategoryId) {
      ctx.response.body = {
        productList: productList.filter(p => p.id !== parseInt(ctx.query.productId) && p.subCategoryId === parseInt(ctx.query.subCategoryId)),
      }
      return
    }
    else if (ctx.query.subCategoryId) {
      productList = productList.filter(p => p.subCategoryId === parseInt(ctx.query.subCategoryId))
    }
    else if (ctx.query.query) {
      const query = ctx.query.query.split(' ').join('')
      const fzf = new Fzf(productList, {
        selector: item => item.name,
      })
      productList = fzf.find(query).map(({ item }) => item)
    }

    if (sortBy === 'id') {
      if (orderBy === 'asc')
        productList.sort((a, b) => a.id - b.id)
      else if (orderBy === 'desc')
        productList.sort((a, b) => b.id - a.id)
    }
    else if (sortBy === 'name') {
      if (orderBy === 'asc')
        productList.sort((a, b) => a.name.localeCompare(b.name))
      else if (orderBy === 'desc')
        productList.sort((a, b) => b.name.localeCompare(a.name))
    }
    else if (sortBy === 'price') {
      if (orderBy === 'asc')
        productList.sort((a, b) => a.price - b.price)
      else if (orderBy === 'desc')
        productList.sort((a, b) => b.price - a.price)
    }

    ctx.response.body = {
      productList: productList.slice(pageSize * (currentPage - 1), currentPage * pageSize),
      pagination: {
        first: 1,
        prev: currentPage > 1 ? currentPage - 1 : null,
        next: currentPage < Math.ceil(productList.length / pageSize) ? currentPage + 1 : null,
        last: Math.ceil(productList.length / pageSize),
      },
    }
  })
})

