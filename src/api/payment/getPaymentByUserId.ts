import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

interface GetPaymentByUserIdRequestData {
  userId: number
}

interface GetPaymentByUserIdResponseData {
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

export function getPaymentByUserId({ userId }: GetPaymentByUserIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetPaymentByUserIdResponseData[]>({
      url: '/payment',
      params: {
        userId,
      },
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const paymentList = mockData.value.payment as any[]

  return { data: paymentList.filter(p => p.userId === userId) }
}
