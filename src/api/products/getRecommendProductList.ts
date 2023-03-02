import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetRecommendProductRequestData {
  productId: number
  subCategoryId: number
}

export function getRecommendProductList({ productId, subCategoryId }: GetRecommendProductRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetProductResponseData[]>({
      url: '/products',
      params: {
        id_ne: productId,
        subCategoryId,
      },
    })
  }

  if (mockData.value == null)
    return { data: [] }

  const productList = [...mockData.value.products]
  return { data: productList.filter(p => p.id !== productId && p.subCategoryId === subCategoryId) }
}
