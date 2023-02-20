import { http } from '@/utils/request'

export interface OrderPayment {
  paymentType: 'credit-card' | 'transfer' | 'cash-on-delivery'
  cardNumber: string | null
  cardOwner: string | null
  cardValidDate: string | null
  cardValidCode: string | null
  bankCode: string | null
  bankAccount: string | null
}

export interface OrderDelivery {
  deliveryType: 'home-delivery' | 'convenience-store'
  county: string | null
  address: string | null
  convenienceStoreData: string | null
}
export type OrderData = OrderPayment & OrderDelivery & {
  name: string
  mobile: string
  email: string
}

export interface BoughtItem {
  productId: number
  name: string
  image: string
  specificationName: string | null
  amount: number
  price: number
}

export interface AddOrderRequestData {
  orderData: OrderData
  boughtItems: BoughtItem[]
}

export interface AddOrderResponseData {
  serialNumber: string
  status: 'prepared' | 'shipped' | 'completed'
  name: string
  mobile: string
  email: string
  address: string
  paymentStatus: 'paid' | 'unpaid'
  boughtItems: BoughtItem[]
  totalAmount: number
  totalPrice: number
  purchaseTime: string
}

export function addOrder(data: AddOrderRequestData) {
  return http.post<AddOrderResponseData>({
    url: '/orders',
    data,
  })
}
