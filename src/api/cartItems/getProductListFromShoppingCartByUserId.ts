import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

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
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetProductListFromShoppingCartByUserIdResponseData[]>({
      url: '/cartItems',
      params: {
        userId,
      },
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: [] }
  }

  if (mockData.value == null)
    return { data: [] }

  const cartItemList = mockData.value.cartItems as any[]
  return { data: cartItemList.filter(item => item.userId === userId) }
}
