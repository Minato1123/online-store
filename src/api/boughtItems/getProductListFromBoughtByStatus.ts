import { http } from '@/utils/request'

export interface GetProductListFromBoughtByStatusRequestData {
  userId: number
  status: 'prepared' | 'shipped' | 'completed'
}

export interface GetProductListFromBoughtByStatusResponseData {
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

export function getProductListFromBoughtByStatus({ userId, status }: GetProductListFromBoughtByStatusRequestData) {
  return http.get<GetProductListFromBoughtByStatusResponseData[]>({
    url: '/boughtItems',
    params: {
      userId,
      status,
    },
  })
}
