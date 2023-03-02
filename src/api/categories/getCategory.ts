import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetCategoryRequestData {
  id: number
}

export interface GetCategoryResponseData {
  id: number
  name: string
  icon: string
}

export function getCategory({ id }: GetCategoryRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetCategoryResponseData>({
      url: `/categories/${id}`,
    })
  }

  if (mockData.value == null)
    return { data: {} }

  const categoryList = mockData.value.categories as any[]

  const category = categoryList.find(u => u.id === id)
  if (category == null)
    return { data: {} }

  return { data: category }
}
