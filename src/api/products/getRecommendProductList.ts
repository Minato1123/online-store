import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export interface GetRecommendProductRequestData {
  productId: number
  subCategoryId: number
}

export function getRecommendProductList({ productId, subCategoryId }: GetRecommendProductRequestData) {
  return http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      id_ne: productId,
      subCategoryId,
    },
  })
}
