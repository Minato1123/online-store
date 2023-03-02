import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

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
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { getTimeStamp, isUserTokenValid } = useMockDataStore()
  const { userId, userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.post<AddOrderResponseData>({
      url: '/orders',
      data,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: {} }
  }

  if (mockData.value == null)
    return { data: {} }

  const { orderData, boughtItems } = data
  const orderList = mockData.value.orders
  const boughtItemList = mockData.value.boughtItems

  const createdTime = getTimeStamp()
  const totalAmount = boughtItems.reduce((acc, item) => acc + item.amount, 0)
  const totalPrice = boughtItems.reduce((acc, item) => acc + item.price * item.amount, 0)

  const orderId = orderList.length > 0 ? orderList[orderList.length - 1].id + 1 : 1
  let boughtItemId = boughtItemList.length > 0 ? boughtItemList[boughtItemList.length - 1].id : 0

  const addedOrderData = {
    id: orderId,
    userId: userId.value,
    serialNumber: `${Date.now()}`,
    status: 'prepared',
    paymentStatus: orderData.paymentType === 'cash-on-delivery' ? 'unpaid' : 'paid',
    totalAmount,
    totalPrice,
    deleted: false,
    purchaseTime: createdTime,
    ...orderData,
  }

  orderList.push(addedOrderData as any)

  const addedBoughtItems = boughtItems.map((item) => {
    return {
      id: ++boughtItemId,
      userId: userId.value,
      orderId: addedOrderData.serialNumber,
      purchaseTime: createdTime,
      deleted: false,
      ...item,
    }
  })

  boughtItemList.push(...addedBoughtItems as any)

  return {
    data: {
      serialNumber: addedOrderData.serialNumber,
      status: addedOrderData.status,
      name: addedOrderData.name,
      mobile: addedOrderData.mobile,
      email: addedOrderData.email,
      county: addedOrderData.county,
      address: addedOrderData.address,
      paymentStatus: addedOrderData.paymentStatus,
      boughtItems: addedBoughtItems,
      totalAmount: addedOrderData.totalAmount,
      totalPrice: addedOrderData.totalPrice,
    },
  }
}
