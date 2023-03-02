import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetProductDescriptionByProductIdRequestData {
  productId: number
}

export interface GetProductDescriptionByProductIdResponseData {
  productId: number
  description: string
  id: number
}

export function getProductDescriptionByProductId({ productId }: GetProductDescriptionByProductIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetProductDescriptionByProductIdResponseData[]>({
      url: '/productDescription',
      params: {
        productId,
      },
    })
  }

  if (mockData.value == null)
    return { data: [] }

  const allProductDescriptionList = mockData.value.productDescription as any[]

  const productDescriptionList = allProductDescriptionList.filter(u => u.productId === productId)
  if (productDescriptionList == null)
    return { data: [] }

  return { data: productDescriptionList }
}
