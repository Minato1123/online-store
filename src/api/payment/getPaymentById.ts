import { http } from '@/utils/request'

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
  return http.get<GetPaymentByIdResponseData>({
    url: `/payment/${id}`,
  })
}
