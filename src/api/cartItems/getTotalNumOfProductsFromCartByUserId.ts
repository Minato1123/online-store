import { http } from '@/utils/request'
import type { getProductListFromShoppingCartByUserIdResponseData } from '@/api/cartItems/getProductListFromShoppingCartByUserId'

export interface getTotalNumOfProductFromCartByUserIdRequestData {
  userId: number
}

export async function getTotalNumOfProductFromCartByUserId({ userId }: getTotalNumOfProductFromCartByUserIdRequestData) {
  const { data: items } = await http.get<getProductListFromShoppingCartByUserIdResponseData[]>({
    url: '/cartItems',
    params: {
      userId,
    },
  })
  return items.reduce((acc, item) => acc + item.amount, 0)
}
