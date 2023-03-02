import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface AddProductToShoppingCartRequestData {
  userId: number
  productId: number
  specificationId: number | null
  amount: number
}

export function addProductToShoppingCart(data: AddProductToShoppingCartRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userId, userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.post<void>({
      url: '/cartItems',
      data,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const { productId, specificationId, amount } = data
  const cartItemList = mockData.value.cartItems as any[]

  const existedCartItem = cartItemList.find(p => p.userId === userId && p.productId === productId && p.specificationId === specificationId)
  if (existedCartItem != null) {
    existedCartItem.amount += amount
    return
  }

  const cartItemId = cartItemList.length > 0 ? cartItemList[cartItemList.length - 1].id + 1 : 1

  cartItemList.push({
    id: cartItemId,
    userId,
    productId,
    specificationId,
    amount,
  })
}
