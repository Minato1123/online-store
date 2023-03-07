import fs from 'fs'
import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import { koaBody } from 'koa-body'
import data from '../public/db.json'

import usePublicRouter from './publicRouter'
import { getUserIdByToken } from './utils'
import usePrivateRouter from './privateRouter'

const app = new Koa()
const publicRouter = new Router()
const privateRouter = new Router()

const tokenMap = new Map([])

app.use(cors())
app.use(koaBody())

usePublicRouter(publicRouter, data, tokenMap)

// 檢查 token 有無過期（就算沒 token 也沒差）
app.use((ctx, next) => {
  // eslint-disable-next-line no-console
  console.log(ctx.method, ctx.URL.pathname, ctx.URL.search)
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
  fs.writeFileSync('./public/db.json', JSON.stringify(data, null, 2))
}, 3000)
