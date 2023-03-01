import { http } from '@/utils/request'

interface GetPaymentByTypeRequestData {
  userId: number
  type: 'credit-card' | 'transfer'
}

export interface GetPaymentByTypeResponseData {
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

export function getPaymentByType({ userId, type }: GetPaymentByTypeRequestData) {
  return http.get<GetPaymentByTypeResponseData[]>({
    url: '/payment',
    params: {
      userId,
      type,
    },
  })
}
