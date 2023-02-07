import { http } from '@/utils/request'

export interface AddUserRequestData {
  email: string
  password: string
  name: string
  birthday: string
  mobile: string
}

export function addUser(data: AddUserRequestData) {
  return http.post<void>({
    url: '/users',
    data,
  })
}
