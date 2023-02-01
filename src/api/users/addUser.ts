import { http } from '@/utils/request'

export interface AddUserRequestData {
  data: {
    email: string
    password: string
    name: string
    birthday: string
    mobile: string
  }
}

export type AddUserResponseData = AddUserRequestData['data'] & {
  id: number
  createAt: string
  address: string
}

export function addUser({ data }: AddUserRequestData) {
  return http.post<AddUserResponseData>({
    url: '/users',
    data,
  })
}
