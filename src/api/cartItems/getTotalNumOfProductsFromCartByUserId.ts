import { http } from '@/utils/request'
import type { GetProductListFromShoppingCartByUserIdResponseData } from '@/api/cartItems/getProductListFromShoppingCartByUserId'

export interface GetTotalNumOfProductFromCartByUserIdRequestData {
  userId: number
}

export async function getTotalNumOfProductFromCartByUserId({ userId }: GetTotalNumOfProductFromCartByUserIdRequestData) {
  const { data: items } = await http.get<GetProductListFromShoppingCartByUserIdResponseData[]>({
    url: '/cartItems',
    params: {
      userId,
    },
  })
  return items.reduce((acc, item) => acc + item.amount, 0)
}
