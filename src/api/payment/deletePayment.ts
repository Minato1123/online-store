import { http } from '@/utils/request'

interface DeletePaymentRequestData {
  id: number
}

export function deletePayment({ id }: DeletePaymentRequestData) {
  return http.delete<void>({
    url: `/payment/${id}`,
  })
}
