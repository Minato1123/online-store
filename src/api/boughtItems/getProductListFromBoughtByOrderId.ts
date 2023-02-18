import { http } from '@/utils/request'

export interface GetProductListFromBoughtByOrderIdRequestData {
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
  purchaseTime: string
  status: 'prepared' | 'shipped' | 'completed'
}

export function getProductListFromBoughtByOrderId({ orderId }: GetProductListFromBoughtByOrderIdRequestData) {
  return http.get<GetProductListFromBoughtByOrderIdResponseData[]>({
    url: '/boughtItems',
    params: {
      orderId,
    },
  })
}
