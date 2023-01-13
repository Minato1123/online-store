import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export interface GetProductByCategoryRequestData {
  categoryId: number
}

export async function getTotalNumOfProductsByCatefory({ categoryId }: GetProductByCategoryRequestData) {
  const { data: productListByCategory } = await http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      categoryId,
    },
  })
  return productListByCategory.length
}
