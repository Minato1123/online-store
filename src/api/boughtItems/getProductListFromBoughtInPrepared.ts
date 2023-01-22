import { http } from '@/utils/request'

export interface GetProductListFromBoughtInPreparedRequestData {
  userId: number
}

export interface GetProductListFromBoughtInPreparedResponseData {
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
  status: 'prepared'
}

export function getProductListFromBoughtInPrepared({ userId }: GetProductListFromBoughtInPreparedRequestData) {
  return http.get<GetProductListFromBoughtInPreparedResponseData[]>({
    url: '/boughtItems',
    params: {
      userId,
      status: 'prepared',
    },
  })
}
