import { http } from '@/utils/request'

export interface GetOrderSerialNumberByStatusRequestData {
  userId: number
  status: 'prepared' | 'shipped' | 'completed'
}

export interface GetOrderSerialNumberByStatusResponseData {
  serialNumber: string
}

export function getOrderSerialNumberByStatus({ userId, status }: GetOrderSerialNumberByStatusRequestData) {
  return http.get<GetOrderSerialNumberByStatusResponseData[]>({
    url: '/orders',
    params: {
      userId,
      status,
    },
  })
}
