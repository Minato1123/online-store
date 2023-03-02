import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'
export interface GetTotalNumOfProductFromCartByUserIdRequestData {
  userId: number
}

export async function getTotalNumOfProductFromCartByUserId({ userId }: GetTotalNumOfProductFromCartByUserIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return await http.get<{ numOfCartItems: number }>({
      url: '/numOfCartItems',
      params: {
        userId,
      },
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: {} }
  }

  if (mockData.value == null)
    return { data: {} }

  const cartItemList = mockData.value.cartItems as any[]
  const numOfCartItems = cartItemList.filter(item => item.userId === userId).reduce((acc, cur) => acc + cur.amount, 0)

  return { data: { numOfCartItems } }
}
