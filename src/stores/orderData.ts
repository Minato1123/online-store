import { defineStore } from 'pinia'
import type { OrderData } from '@/types/index'

export const useOrderDataStore = defineStore('orderData', () => {
  function generateEmptyOrderData(): OrderData {
    return {
      name: '',
      mobile: '',
      email: '',
      paymentType: 'credit-card',
      cardNumber: '',
      cardOwner: '',
      cardValidDate: '',
      cardValidCode: '',
      transferData: null,
      deliveryType: 'delivery',
      county: null,
      address: '',
      convenienceStoreData: null,
    }
  }

  const orderData = ref<OrderData>(generateEmptyOrderData())

  function resetOrderData() {
    orderData.value = generateEmptyOrderData()
  }

  return { orderData, resetOrderData }
})
