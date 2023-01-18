import { http } from '@/utils/request'

export interface getProductListFromShoppingCartByUserIdRequestData {
  userId: number
}

export interface getProductListFromShoppingCartByUserIdResponseData {
  id: number
  userId: number
  productId: number
  specificationId: number
  amount: number
}

export function getProductListFromShoppingCartByUserId({ userId }: getProductListFromShoppingCartByUserIdRequestData) {
  return http.get<getProductListFromShoppingCartByUserIdResponseData[]>({
    url: '/cartItems',
    params: {
      userId,
    },
  })
}
