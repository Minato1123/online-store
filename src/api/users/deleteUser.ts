import { http } from '@/utils/request'

export interface AddUserRequestData {
  id: number
}

export function addUser({ id }: AddUserRequestData) {
  return http.delete<void>({
    url: `/users/${id}`,
  })
}
