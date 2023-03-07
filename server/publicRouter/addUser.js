import { defineRoute, getTimeStamp } from '../utils'
const regexpForPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const regexpForBirthday = /^\d{4}-\d{2}-\d{2}$/
const regexpForMobile = /^09\d{8}$/

export default defineRoute((router, data) => {
  router.post('/users', (ctx) => {
    const { email, password, name, birthday, mobile } = ctx.request.body
    const userList = data.users

    const user = userList.find(u => u.email === email)
    if (user) {
      ctx.status = 400
      return
    }

    if (
      regexpForPassword.test(password) === false
      || name == null
      || name === ''
      || regexpForBirthday.test(birthday) === false
      || new Date(birthday).toString === 'Invalid Date'
      || regexpForMobile.test(mobile) === false) {
      ctx.status = 400
      return
    }

    let userId = 1
    if (userList.length > 0)
      userId = userList[userList.length - 1].id + 1

    userList.push({
      id: userId,
      email,
      password,
      name,
      birthday,
      mobile,
      createAt: getTimeStamp(),
      address: '',
      deleted: false,
    })
    ctx.status = 201
    ctx.response.body = {}
  })
})

