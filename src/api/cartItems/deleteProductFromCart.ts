import { http } from '@/utils/request'

export interface deleteProductFromCartRequestData {
  id: number
}

export interface deleteProductFromCartResponseData {
  id: number
  userId: number
  productId: number
  specification: string | null
  amount: number
}

export function deleteProductFromCart({ id }: deleteProductFromCartRequestData) {
  return http.delete<deleteProductFromCartResponseData>({
    url: `/cartItems/${id}`,
  })
}
