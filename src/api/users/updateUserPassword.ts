import { http } from '@/utils/request'

export interface UpdateUserPasswordRequestData {
  id: number
  oldPassword: string
  newPassword: string
}

export function updateUserPasswordData(data: UpdateUserPasswordRequestData) {
  return http.patch<void>({
    url: `users/${data.id}`,
    data,
  })
}
