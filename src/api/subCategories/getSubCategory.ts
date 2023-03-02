import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetSubCategoryRequestData {
  id: number
}

export interface GetSubCategoryResponseData {
  categoryId: number
  name: string
  id: number
}

export function getSubCategory({ id }: GetSubCategoryRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetSubCategoryResponseData>({
      url: `/subCategories/${id}`,
    })
  }

  if (mockData.value == null)
    return { data: {} }

  const subCategoryList = mockData.value.subCategories as any[]
  const subCategory = subCategoryList.find(u => u.id === id)
  if (subCategory == null)
    return { data: {} }

  return { data: subCategory }
}
