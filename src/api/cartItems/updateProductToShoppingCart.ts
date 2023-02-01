import { http } from '@/utils/request'

export interface UpdateProductToShoppingCartRequestData {
  data: {
    id: number
    amount: number
  }
}

export type UpdateProductToShoppingCartResponseData = UpdateProductToShoppingCartRequestData['data']

export function updateProductToShoppingCart({ data }: UpdateProductToShoppingCartRequestData) {
  return http.patch<UpdateProductToShoppingCartResponseData>({
    url: `/cartItems/${data.id}`,
    data,
  })
}
