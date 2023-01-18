import { http } from '@/utils/request'

export interface getProductListFromFollowingByUserIdRequestData {
  userId: number
}

export interface getProductListFromFollowingByUserIdResponseData {
  id: number
  userId: number
  productId: number
}

export function getProductListFromFollowingByUserId({ userId }: getProductListFromFollowingByUserIdRequestData) {
  return http.get<getProductListFromFollowingByUserIdResponseData[]>({
    url: '/followItems',
    params: {
      userId,
    },
  })
}
