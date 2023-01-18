import { http } from '@/utils/request'

export interface addProductToShoppingCartRequestData {
  data: {
    userId: number
    productId: number
    specificationId: number | null
    amount: number
  }
}

// 沒有自行改寫 json-server 處理程序，所以這會是 json-server 回傳的資料的型別
export type AddProductToShoppingCartResponseData = addProductToShoppingCartRequestData['data'] & {
  id: number
}

export function addProductToShoppingCart({ data }: addProductToShoppingCartRequestData) {
  return http.post<AddProductToShoppingCartResponseData>({
    url: '/cartItems',
    data,
  })
}
