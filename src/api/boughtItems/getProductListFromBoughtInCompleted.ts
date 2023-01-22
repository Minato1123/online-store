import { http } from '@/utils/request'

export interface GetProductListFromBoughtInCompletedRequestData {
  userId: number
}

export interface GetProductListFromBoughtInCompletedResponseData {
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
  status: 'completed'
}

export function getProductListFromBoughtInCompleted({ userId }: GetProductListFromBoughtInCompletedRequestData) {
  return http.get<GetProductListFromBoughtInCompletedResponseData[]>({
    url: '/boughtItems',
    params: {
      userId,
      status: 'shipped',
    },
  })
}
