import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface DeleteProductFromCartRequestData {
  id: number
}

export function deleteProductFromCart({ id }: DeleteProductFromCartRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.delete<void>({
      url: `/cartItems/${id}`,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const cartItemList = mockData.value.cartItems as any[]
  const index = cartItemList.findIndex(item => item.id === id)

  if (index === -1)
    return

  cartItemList.splice(index, 1)
}
