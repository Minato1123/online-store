import { http } from '@/utils/request'

export interface DeleteProductFromFollowingRequestData {
  id: number
}

export function deleteProductFromFollowing({ id }: DeleteProductFromFollowingRequestData) {
  return http.delete<void>({
    url: `/followItems/${id}`,
  })
}
