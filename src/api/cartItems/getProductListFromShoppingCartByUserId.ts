import { http } from '@/utils/request'

export interface GetProductListFromShoppingCartByUserIdRequestData {
  userId: number
}

export interface GetProductListFromShoppingCartByUserIdResponseData {
  id: number
  userId: number
  productId: number
  specificationId: number
  amount: number
}

export function getProductListFromShoppingCartByUserId({ userId }: GetProductListFromShoppingCartByUserIdRequestData) {
  return http.get<GetProductListFromShoppingCartByUserIdResponseData[]>({
    url: '/cartItems',
    params: {
      userId,
    },
  })
}
