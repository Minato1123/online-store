import { http } from '@/utils/request'

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
  return http.get<GetPaymentByTypeResponseData[]>({
    url: '/payment',
    params: {
      userId,
      type,
    },
  })
}
