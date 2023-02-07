import { http } from '@/utils/request'
import type { OrderData } from '@/api/boughtItems/addOrder'

export interface GetOrderByOrderIdRequestData {
  serialNumber: string
}

export type GetOrderByOrderIdResponseData = OrderData & {
  userId: number
  serialNumber: string
  status: 'prepared' | 'shipped' | 'completed'
  paymentStatus: 'unpaid' | 'paid'
  totalAmount: number
  totalPrice: number
  id: number
}

export function getOrderByOrderId({ serialNumber }: GetOrderByOrderIdRequestData) {
  return http.get<GetOrderByOrderIdResponseData>({
    url: '/orders',
    params: {
      serialNumber,
    },
  })
}
