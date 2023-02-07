const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const data = require('../public/db.json')

const app = new Koa()
const publicRouter = new Router()
const privateRouter = new Router()

const usePublicRouter = require('./publicRouter')
const { getUserIdByToken } = require('./utils')
const usePrivateRouter = require('./privateRouter')

const tokenMap = new Map([['pochacco', 1]])

app.use(cors())
app.use(koaBody())

usePublicRouter(publicRouter, data, tokenMap)

// 檢查 token 有無過期（就算沒 token 也沒差）
app.use((ctx, next) => {
  const theToken = ctx.request.headers['access-token']
  if (theToken === '') {
    next()
    return
  }

  const userId = getUserIdByToken(theToken, tokenMap)
  if (userId == null) {
    ctx.status = 401
    return
  }

  next()
})

app.use(publicRouter.routes())

usePrivateRouter(privateRouter, data, tokenMap)

// 確認一定要登入
app.use((ctx, next) => {
  const theToken = ctx.request.headers['access-token']
  console.log(ctx.URL.pathname, ctx.URL.search)
  if (theToken === '') {
    ctx.status = 401
    return
  }

  const userId = getUserIdByToken(theToken, tokenMap)
  if (userId == null) {
    ctx.status = 401
    return
  }

  const userIndex = data.users.findIndex(u => u.id === userId)
  if (userIndex === -1) {
    ctx.status = 401
    return
  }

  next()
})

app.use(privateRouter.routes())

app.listen(3000)

setInterval(() => {
  const fs = require('fs')
  fs.writeFileSync('./public/db.json', JSON.stringify(data, null, 2))
}, 3000)
