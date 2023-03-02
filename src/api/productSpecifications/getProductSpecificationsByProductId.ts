import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetProductSpecificationsByProductIdRequestData {
  productId: number
}

export interface GetProductSpecificationsByProductIdResponseData {
  productId: number
  specName: string
  id: number
}

export function getProductSpecificationsByProductId({ productId }: GetProductSpecificationsByProductIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetProductSpecificationsByProductIdResponseData[]>({
      url: '/productSpecifications',
      params: {
        productId,
      },
    })
  }

  if (mockData.value == null)
    return { data: [] }

  const allProductSpecificationList = mockData.value.productSpecifications as any[]

  const productSpecificationList = allProductSpecificationList.filter(u => u.productId === productId)
  if (productSpecificationList == null)
    return { data: [] }

  return { data: productSpecificationList }
}
