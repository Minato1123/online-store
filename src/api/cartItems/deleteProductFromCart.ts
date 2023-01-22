import { http } from '@/utils/request'

export interface DeleteProductFromCartRequestData {
  id: number
}

export interface DeleteProductFromCartResponseData {
  id: number
  userId: number
  productId: number
  specification: string | null
  amount: number
}

export function deleteProductFromCart({ id }: DeleteProductFromCartRequestData) {
  return http.delete<DeleteProductFromCartResponseData>({
    url: `/cartItems/${id}`,
  })
}
