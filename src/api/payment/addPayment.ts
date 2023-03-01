import { http } from '@/utils/request'

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
  return http.post<void>({
    url: '/payment',
    data,
  })
}
