import { http } from '@/utils/request'

export interface UpdateProductToShoppingCartRequestData {
  id: number
  amount: number
}

export function updateProductToShoppingCart(data: UpdateProductToShoppingCartRequestData) {
  return http.patch<void>({
    url: `/cartItems/${data.id}`,
    data,
  })
}
