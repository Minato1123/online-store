import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'
interface DeletePaymentRequestData {
  id: number
}

export function deletePayment({ id }: DeletePaymentRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.delete<void>({
      url: `/payment/${id}`,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const paymentList = mockData.value.payment as any[]
  const index = paymentList.findIndex(item => item.id === id)

  if (index === -1)
    return

  paymentList.splice(index, 1)
}
