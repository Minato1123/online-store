import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetProductByCategoryRequestData {
  categoryId: number
}

export async function getTotalNumOfProductsByCategory({ categoryId }: GetProductByCategoryRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return await http.get<{ numOfProducts: number }>({
      url: '/numOfProducts',
      params: {
        categoryId,
      },
    })
  }

  if (mockData.value == null)
    return { data: { numOfProducts: 0 } }

  const productList = [...mockData.value.products]
  return { data: { numOfProducts: productList.filter(p => p.categoryId === categoryId).length } }
}
