import { http } from '@/utils/request'

interface UpdatePaymentRequestData {
  id: number
  cardNumber: string
  cardOwner: string
  cardValidDate: string
  cardValidCode: string
  bankCode: string
  bankAccount: string
}

export function updatePayment(data: UpdatePaymentRequestData) {
  return http.patch<void>({
    url: `/payment/${data.id}`,
    data,
  })
}
