import { http } from '@/utils/request'

export interface DeleteProductFromCartRequestData {
  id: number
}

export function deleteProductFromCart({ id }: DeleteProductFromCartRequestData) {
  return http.delete<void>({
    url: `/cartItems/${id}`,
  })
}
