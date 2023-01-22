import { http } from '@/utils/request'

export interface GetProductListFromBoughtInShippedRequestData {
  userId: number
}

export interface GetProductListFromBoughtInShippedResponseData {
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
  status: 'shipped'
}

export function getProductListFromBoughtInShipped({ userId }: GetProductListFromBoughtInShippedRequestData) {
  return http.get<GetProductListFromBoughtInShippedResponseData[]>({
    url: '/boughtItems',
    params: {
      userId,
      status: 'shipped',
    },
  })
}
