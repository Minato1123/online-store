/* eslint-disable no-console */
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '../public/db.json'))
const middlewares = jsonServer.defaults()

const tokenMap = new Map([])
const regexpForPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const regexpForBirthday = /^\d{4}-\d{2}-\d{2}$/
const regexpForMobile = /^09\d{8}$/
let islogin = false

function getTimeStamp() {
  return Date.now()
}

function getUserIdByToken(accessToken) {
  return tokenMap.get(accessToken)
}

server.use(middlewares)

server.use((req, res, next) => {
  // 判斷是否維持登入
  const theToken = req.headers['access-token']
  const userId = getUserIdByToken(theToken)
  if (userId == null) {
    islogin = false
    tokenMap.delete(theToken)
  }
  else {
    islogin = true
  }

  // 如果沒登入
  if (!islogin) {
    if (/^\/((follow|cart|bought)Items|orders)/.test(req.url)) {
      res.status(401).jsonp({
        message: 'Please login first',
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})
server.use(jsonServer.bodyParser)
server.post('/login', (req, res) => {
  const { email, password } = req.body
  const users = router.db.get('users').value()
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    if (!islogin) {
      for (const [key, value] of tokenMap) {
        if (value === user.id) {
          tokenMap.delete(key)
          break
        }
      }

      const token = `${Date.now()}`
      tokenMap.set(token, user.id)
      islogin = true
      res.locals.data = {
        token,
        userId: user.id,
        ...res.locals.data,
      }
      res.jsonp(
        res.locals.data,
      )
    }
    else {
      res.status(401).jsonp({
        message: 'You are already logged in',
      })
    }
  }
  else {
    islogin = false
    res.status(401).jsonp({
      message: 'Invalid email or password',
    })
  }
})

server.post('/logout', (req, res) => {
  const theToken = req.headers['access-token']
  tokenMap.delete(theToken)
  islogin = false
  res.status(200).jsonp(
    {
      message: 'logout success',
    },
  )
})

server.post('/users', (req, res) => {
  const { email, password, name, birthday, mobile } = req.body
  const users = router.db.get('users').value()
  const isNewUser = users.find(u => u.email === email) == null
  if (isNewUser) {
    if (regexpForPassword.test(password) === false) {
      res.status(400).jsonp({
        message: 'Password must contain at least 8 characters, at least one letter and one number',
      })
    }
    else if (name == null || name === '') {
      res.status(400).jsonp({
        message: 'Name is required',
      })
    }
    else if (regexpForBirthday.test(birthday) === false || new Date(birthday).toString === 'Invalid Date') {
      res.status(400).jsonp({
        message: 'Birthday is invalid',
      })
    }
    else if (regexpForMobile.test(mobile) === false) {
      res.status(400).jsonp({
        message: 'Mobile is invalid',
      })
    }
    else {
      const user = {
        email,
        password,
        name,
        birthday,
        mobile,
        createAt: getTimeStamp(),
        address: '',
      }
      const result = router.db.get('users').insert(user).value()
      router.db.write()

      res.jsonp(result)
    }
  }
  else {
    res.status(400).jsonp({
      message: 'Email is already registered',
    })
  }
})

server.patch('/users/:id', (req, res, next) => {
  if (req.body.password != null) {
    const id = Number(req.params.id)
    const { oldPassword, newPassword } = req.body
    const users = router.db.get('users').value()
    const user = users.find(u => u.id === id)
    console.log(user)
    if (user == null) {
      res.status(400).jsonp({
        message: 'User not found',
      })
    }
    else if (user.password !== oldPassword) {
      console.log(user.password, oldPassword)
      res.status(400).jsonp({
        message: 'Old password is incorrect',
      })
    }
    else if (oldPassword === newPassword) {
      res.status(400).jsonp({
        message: 'New password cannot be the same as the old password',
      })
    }
    else {
      req.body.password = newPassword
      req.body.data = undefined
      next()
    }
  }
  else {
    next()
  }
})

server.post('/cartItems', (req, res, next) => {
  const { body } = req
  const { userId, productId, specificationId, amount } = body
  const cartItems = router.db.get('cartItems').value()
  const existedCartItem = cartItems.find(p => p.userId === userId && p.productId === productId && p.specificationId === specificationId)
  if (existedCartItem != null) {
    req.method = 'PATCH'
    req.url = `/cartItems/${existedCartItem.id}`
    req.body.amount = existedCartItem.amount + amount
    next()
  }
  else {
    next()
  }
})

server.post('/orders', (req, res) => {
  const userId = getUserIdByToken(req.headers['access-token'])
  const { orderData, boughtItems } = req.body
  const createdTime = getTimeStamp()
  const totalAmount = boughtItems.reduce((acc, item) => acc + item.amount, 0)
  const totalPrice = boughtItems.reduce((acc, item) => acc + item.price * item.amount, 0)

  const addedOrderData = router.db.get('orders').insert({
    userId,
    serialNumber: `${Date.now()}`,
    status: 'prepared',
    paymentStatus: orderData.paymentType === 'cash-on-delivery' ? 'unpaid' : 'paid',
    totalAmount,
    totalPrice,
    ...orderData,
  }).value()

  const addedBoughtItems = boughtItems.map((item) => {
    return router.db.get('boughtItems').insert({
      userId,
      orderId: addedOrderData.serialNumber,
      purchaseTime: createdTime,
      ...item,
    }).value()
  })

  router.db.write()

  res.jsonp({
    serialNumber: addedOrderData.serialNumber,
    status: addedOrderData.status,
    name: addedOrderData.name,
    mobile: addedOrderData.mobile,
    email: addedOrderData.email,
    county: addedOrderData.county,
    address: addedOrderData.address,
    paymentStatus: addedOrderData.paymentStatus,
    boughtItems: addedBoughtItems,
    totalAmount: addedOrderData.totalAmount,
    totalPrice: addedOrderData.totalPrice,
  })
})

server.use(router)

// router.render = (req, res) => {
//   if (req.method === 'GET' && req.url === '/products') {

//   }
// }

server.listen(3000, () => {
  console.log(router.db.keys().map(item => `http://localhost:3000/${item}`).join('\n').value())
  console.log('')
  console.log('JSON Server is running')
})
