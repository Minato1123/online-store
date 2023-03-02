import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface UpdateProductToShoppingCartRequestData {
  id: number
  amount: number
}

export function updateProductToShoppingCart(data: UpdateProductToShoppingCartRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.patch<void>({
      url: `/cartItems/${data.id}`,
      data,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const cartItemList = mockData.value.cartItems as any[]
  cartItemList.find(item => item.id === data.id).amount = data.amount
}
