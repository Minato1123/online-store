import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export async function getTotalNumOfProducts() {
  const { data: productList } = await http.get<GetProductResponseData[]>({
    url: '/products',
  })
  return productList.length
}
