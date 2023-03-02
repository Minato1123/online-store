import { http } from '@/utils/request'
import type { OrderData } from '@/api/boughtItems/addOrder'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface GetOrderByOrderIdRequestData {
  serialNumber: string
}

export type GetOrderByOrderIdResponseData = OrderData & {
  userId: number
  serialNumber: string
  status: 'prepared' | 'shipped' | 'completed'
  paymentStatus: 'unpaid' | 'paid'
  totalAmount: number
  totalPrice: number
  id: number
}

export function getOrderByOrderId({ serialNumber }: GetOrderByOrderIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetOrderByOrderIdResponseData>({
      url: '/orders',
      params: {
        serialNumber,
      },
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: {} }
  }

  if (mockData.value == null)
    return { data: {} }

  const orderList = mockData.value.orders as any[]

  return { data: orderList.find(order => order.serialNumber === serialNumber) }
}
