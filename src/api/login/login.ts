import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface loginRequestData {
  email: string
  password: string
}

export interface loginResponseData {
  token: string
  userId: number
}

export function login(data: loginRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { tokenMap } = useMockDataStore()

  if (!isMocked.value) {
    return http.post<loginResponseData>({
      url: '/login',
      data,
    })
  }

  if (mockData.value == null)
    return { data: {} }

  const users = mockData.value.users as any[]
  const user = users.find(u => u.email === data.email && u.password === data.password)
  if (user == null)
    return { data: {} }

  for (const [key, value] of tokenMap) {
    if (value === user.id) {
      tokenMap.delete(key)
      break
    }
  }

  const token = `${Date.now()}`
  tokenMap.set(token, user.id)
  return {
    data: {
      token,
      userId: user.id,
    },
  }
}
