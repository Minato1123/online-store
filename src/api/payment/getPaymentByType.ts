import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'
interface GetPaymentByTypeRequestData {
  userId: number
  type: 'credit-card' | 'transfer'
}

export interface GetPaymentByTypeResponseData {
  id: number
  userId: number
  type: 'credit-card' | 'transfer'
  cardNumber: string
  cardOwner: string
  cardValidDate: string
  cardValidCode: string
  bankCode: string
  bankAccount: string
}

export function getPaymentByType({ userId, type }: GetPaymentByTypeRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetPaymentByTypeResponseData[]>({
      url: '/payment',
      params: {
        userId,
        type,
      },
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: [] }
  }

  if (mockData.value == null)
    return { data: [] }

  const paymentList = mockData.value.payment as any[]
  return { data: paymentList.filter(p => p.userId === userId && p.type === type) }
}
