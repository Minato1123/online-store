import { http } from '@/utils/request'

export interface UpdateUserRequestData {
  id: number
  name: string
  email: string
  birthday: string
  mobile: string
  address: string
}

export function updateUserData(data: UpdateUserRequestData) {
  return http.patch<void>({
    url: `/users/${data.id}`,
    data,
  })
}
