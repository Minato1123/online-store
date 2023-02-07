import { http } from '@/utils/request'

export interface AddProductToFollowingRequestData {
  userId: number
  productId: number
}

export function addProductToFollowing(data: AddProductToFollowingRequestData) {
  return http.post<void>({
    url: '/followItems',
    data,
  })
}
