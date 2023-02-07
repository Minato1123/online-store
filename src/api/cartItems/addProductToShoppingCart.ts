import { http } from '@/utils/request'

export interface AddProductToShoppingCartRequestData {
  userId: number
  productId: number
  specificationId: number | null
  amount: number
}

export function addProductToShoppingCart(data: AddProductToShoppingCartRequestData) {
  return http.post<void>({
    url: '/cartItems',
    data,
  })
}
