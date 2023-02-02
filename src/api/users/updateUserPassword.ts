import { http } from '@/utils/request'

export interface UpdateUserPasswordRequestData {
  data: {
    id: number
    oldPassword: string
    newPassword: string
  }
}

export type UpdateUserPasswordResponseData = UpdateUserPasswordRequestData['data']

export function updateUserPasswordData({ data }: UpdateUserPasswordRequestData) {
  return http.patch<UpdateUserPasswordResponseData>({
    url: `users/${data.id}`,
    data,
  })
}
