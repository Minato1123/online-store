import { http } from '@/utils/request'

export interface AddProductToFollowingRequestData {
  data: {
    userId: number
    productId: number
  }
}

export type AddProductToFollowingResponseData = AddProductToFollowingRequestData['data'] & {
  id: number
}

export function addProductToFollowing({ data }: AddProductToFollowingRequestData) {
  return http.post<AddProductToFollowingResponseData>({
    url: '/followItems',
    data,
  })
}
