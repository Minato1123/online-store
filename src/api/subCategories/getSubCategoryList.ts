import type { GetSubCategoryResponseData } from './getSubCategory'
import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetSubCategoryRequestData {
  categoryId: number
}

export function getSubCategoryList({ categoryId }: GetSubCategoryRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetSubCategoryResponseData[]>({
      url: '/subCategories',
      params: {
        categoryId,
      },
    })
  }

  if (mockData.value == null)
    return { data: [] }

  const subCategories = mockData.value.subCategories as any[]
  return { data: subCategories.filter(subcategory => subcategory.categoryId === categoryId) }
}
