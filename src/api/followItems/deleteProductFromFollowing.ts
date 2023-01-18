import { http } from '@/utils/request'

export interface deleteProductFromFollowingRequestData {
  id: number
}

export interface deleteProductFromFollowingResponseData {
  id: number
  userId: number
  productId: number
  specification: string | null
  amount: number
}

export function deleteProductFromFollowing({ id }: deleteProductFromFollowingRequestData) {
  return http.delete<deleteProductFromFollowingResponseData>({
    url: `/followItems/${id}`,
  })
}
