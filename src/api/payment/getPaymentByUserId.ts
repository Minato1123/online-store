import { http } from '@/utils/request'

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
  return http.get<GetPaymentByUserIdResponseData[]>({
    url: '/payment',
    params: {
      userId,
    },
  })
}
