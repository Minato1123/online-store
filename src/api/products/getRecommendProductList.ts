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
    return http.get<{ productList: GetProductResponseData[] }>({
      url: '/products',
      params: {
        productId,
        subCategoryId,
      },
    })
  }

  if (mockData.value == null)
    return { data: { productList: [] } }

  const productList = [...mockData.value.products]
  return { data: { productList: productList.filter(p => p.id !== productId && p.subCategoryId === subCategoryId) } }
}
