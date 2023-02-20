import { http } from '@/utils/request'

export interface GetOrderSerialNumberByStatusRequestData {
  userId: number
  status: 'prepared' | 'shipped' | 'completed'
}

export interface GetOrderSerialNumberByStatusResponseData {
  id: number
  userId: number
  serialNumber: number
  status: 'prepared' | 'shipped' | 'completed'
  paymentStatus: 'paid' | 'unpaid'
  totalAmount: number
  totalPrice: number
  deleted: boolean
  name: string
  mobile: string
  email: string
  paymentType: 'credit-card' | 'transfer' | 'cash-on-delivery'
  cardNumber: string | null
  cardOwner: string | null
  cardValidDate: string | null
  cardValidCode: string | null
  bankCode: string | null
  bankAccount: string | null
  deliveryType: 'home-delivery' | 'convenience-store'
  county: string | null
  address: string | null
  convenienceStoreData: string | null
  purchaseTime: string
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
