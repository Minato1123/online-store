import type { GetCategoryResponseData } from './getCategory'
import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export function getCategoryList() {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetCategoryResponseData[]>({
      url: '/categories',
    })
  }

  if (mockData.value == null)
    return { data: {} }

  return { data: mockData.value.categories }
}
