import { http } from '@/utils/request'

export interface UpdateUserRequestData {
  data: {
    id: number
    name: string
    email: string
    birthday: string
    mobile: string
    address: string
  }
}

export type UpdateUserResponseData = UpdateUserRequestData['data']

export function updateUserData({ data }: UpdateUserRequestData) {
  return http.patch<UpdateUserResponseData>({
    url: `/users/${data.id}`,
    data,
  })
}
