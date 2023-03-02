import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface AddPaymentRequestData {
  type: 'credit-card' | 'transfer'
  cardNumber: string
  cardOwner: string
  cardValidDate: string
  cardValidCode: string
  bankCode: string
  bankAccount: string
}

export function addPayment(data: AddPaymentRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userId, userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.post<void>({
      url: '/payment',
      data,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const paymentList = mockData.value.payment as any[]

  const paymentId = paymentList.length > 0 ? paymentList[paymentList.length - 1].id + 1 : 1
  paymentList.push({
    id: paymentId,
    userId: userId.value,
    ...data,
  })
}
