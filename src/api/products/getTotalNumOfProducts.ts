import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export async function getTotalNumOfProducts() {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return await http.get<{ numOfProducts: number }>({
      url: '/numOfProducts',
    })
  }

  if (mockData.value == null)
    return { data: {} }

  const productList = [...mockData.value.products]
  const numOfProducts = productList.length
  return { data: { numOfProducts } }
}
