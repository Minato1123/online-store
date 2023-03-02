import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface AddUserRequestData {
  email: string
  password: string
  name: string
  birthday: string
  mobile: string
}

export function addUser(data: AddUserRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { getTimeStamp } = useMockDataStore()

  if (!isMocked.value) {
    return http.post<void>({
      url: '/users',
      data,
    })
  }

  if (mockData.value == null)
    return

  const { email, password, name, birthday, mobile } = data
  const userList = mockData.value.users as any[]

  const user = userList.find(u => u.email === email)
  if (user)
    return

  const regexpForPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const regexpForBirthday = /^\d{4}-\d{2}-\d{2}$/
  const regexpForMobile = /^09\d{8}$/

  if (
    regexpForPassword.test(password) === false
      || name == null
      || name === ''
      || regexpForBirthday.test(birthday) === false
      || regexpForMobile.test(mobile) === false)
    return

  const userId = userList.length > 0 ? userList[userList.length - 1].id + 1 : 1

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
}
