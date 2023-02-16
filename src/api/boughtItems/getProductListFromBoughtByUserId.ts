import { http } from '@/utils/request'

export interface GetProductListFromBoughtByUserIdRequestData {
  userId: number
}

export interface GetProductListFromBoughtByUserIdResponseData {
  id: number
  orderId: string
  productId: number
  name: string
  image: string
  specification: string | null
  amount: number
  price: number
  dateOfPurchase: string
  timeOfPurchase: string
  status: 'prepared' | 'shipped' | 'completed'
}

export function getProductListFromBoughtByUserId({ userId }: GetProductListFromBoughtByUserIdRequestData) {
  return http.get<GetProductListFromBoughtByUserIdResponseData[]>({
    url: '/boughtItems',
    params: {
      userId,
    },
  })
}