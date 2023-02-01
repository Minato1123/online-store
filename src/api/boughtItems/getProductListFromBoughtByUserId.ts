import { http } from '@/utils/request'

export interface getProductListFromBoughtByUserIdRequestData {
  userId: number
}

export interface getProductListFromBoughtByUserIdResponseData {
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

export function getProductListFromBoughtByUserId({ userId }: getProductListFromBoughtByUserIdRequestData) {
  return http.get<getProductListFromBoughtByUserIdResponseData[]>({
    url: '/boughtItems',
    params: {
      userId,
    },
  })
}
