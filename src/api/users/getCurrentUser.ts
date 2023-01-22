import { http } from '@/utils/request'

export interface GetCurrentUserRequestData {
  id: number
}

export interface GetCurrentUserResponseData {
  id: number
  name: string
  email: string
  birthday: string
  mobile: string
  address: string
}

export function getCurrentUser({ id }: GetCurrentUserRequestData) {
  return http.get<GetCurrentUserResponseData>({
    url: `/users/${id}`,
  })
}
