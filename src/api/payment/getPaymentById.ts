import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

interface GetPaymentByIdRequestData {
  id: number
}

interface GetPaymentByIdResponseData {
  id: number
  userId: number
  type: 'credit-card' | 'transfer'
  cardNumber: string | null
  cardOwner: string | null
  cardValidDate: string | null
  cardValidCode: string | null
  bankCode: string | null
  bankAccount: string | null
}

export function getPaymentById({ id }: GetPaymentByIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetPaymentByIdResponseData>({
      url: `/payment/${id}`,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: {} }
  }

  if (mockData.value == null)
    return { data: {} }

  const paymentList = mockData.value.payment as any[]

  const thePayment = paymentList.find(u => u.id === id)
  if (thePayment == null)
    return { data: {} }

  return thePayment
}
