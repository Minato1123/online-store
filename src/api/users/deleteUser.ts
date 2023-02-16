import { http } from '@/utils/request'

export interface DeleteUserRequestData {
  id: number
}

export function deleteUser({ id }: DeleteUserRequestData) {
  return http.delete<void>({
    url: `/users/${id}`,
  })
}
