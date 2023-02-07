import { http } from '@/utils/request'
export interface GetTotalNumOfProductFromCartByUserIdRequestData {
  userId: number
}

export async function getTotalNumOfProductFromCartByUserId({ userId }: GetTotalNumOfProductFromCartByUserIdRequestData) {
  return await http.get<{ numOfCartItems: number }>({
    url: '/numOfCartItems',
    params: {
      userId,
    },
  })
}
