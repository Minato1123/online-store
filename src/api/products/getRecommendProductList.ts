import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export interface GetRecommendProductRequestData {
  productId: number
  categoryId: number
  subCategoryId: number
}

export function getRecommendProductList({ productId, categoryId, subCategoryId }: GetRecommendProductRequestData) {
  return http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      id_ne: productId,
      categoryId,
      subCategoryId,
    },
  })
}
