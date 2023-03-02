import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetProductBySubCategoryRequestData {
  subCategoryId: number
}

export async function getTotalNumOfProductsBySubCategory({ subCategoryId }: GetProductBySubCategoryRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return await http.get<{ numOfProducts: number }>({
      url: '/numOfProducts',
      params: {
        subCategoryId,
      },
    })
  }

  if (mockData.value == null)
    return { data: { numOfProducts: 0 } }

  const productList = [...mockData.value.products]
  return { data: { numOfProducts: productList.filter(p => p.subCategoryId === subCategoryId).length } }
}
