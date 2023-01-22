import { http } from '@/utils/request'

export interface GetProductListFromBoughtByOrderIdRequestData {
  userId: number
  orderId: string
}

export interface GetProductListFromBoughtByOrderIdResponseData {
  id: number
  orderId: string
  productId: number
  name: string
  image: string
  specificationName: string | null
  amount: number
  price: number
  dateOfPurchase: string
  timeOfPurchase: string
  status: 'prepared' | 'shipped' | 'completed'
}

export function getProductListFromBoughtByOrderId({ userId, orderId }: GetProductListFromBoughtByOrderIdRequestData) {
  return http.get<GetProductListFromBoughtByOrderIdResponseData[]>({
    url: '/boughtItems',
    params: {
      userId,
      orderId,
    },
  })
}
