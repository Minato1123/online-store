import { http } from '@/utils/request'

export interface GetProductListFromFollowingByUserIdRequestData {
  userId: number
}

export interface GetProductListFromFollowingByUserIdResponseData {
  id: number
  userId: number
  productId: number
}

export function getProductListFromFollowingByUserId({ userId }: GetProductListFromFollowingByUserIdRequestData) {
  return http.get<GetProductListFromFollowingByUserIdResponseData[]>({
    url: '/followItems',
    params: {
      userId,
    },
  })
}
