import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface GetProductListFromBoughtByOrderIdRequestData {
  orderId: string
}

export interface GetProductListFromBoughtByOrderIdResponseData {
  id: number
  orderId: string
  productId: number
  name: string
  image: string
  specificationName: string | null
  amount: number
  price: number
  purchaseTime: string
  status: 'prepared' | 'shipped' | 'completed'
}

export function getProductListFromBoughtByOrderId({ orderId }: GetProductListFromBoughtByOrderIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetProductListFromBoughtByOrderIdResponseData[]>({
      url: '/boughtItems',
      params: {
        orderId,
      },
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: [] }
  }

  if (mockData.value == null)
    return { data: [] }

  const boughtItemList = mockData.value.boughtItems as any[]
  return { data: boughtItemList.filter(item => item.orderId === orderId) }
}
