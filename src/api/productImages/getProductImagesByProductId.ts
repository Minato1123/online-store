import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetProductImagesByProductIdRequestData {
  productId: number
}

export interface GetProductImagesByProductIdResponseData {
  productId: number
  image: string
  id: number
}

export function getProductImagesByProductId({ productId }: GetProductImagesByProductIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetProductImagesByProductIdResponseData[]>({
      url: '/productImages',
      params: {
        productId,
      },
    })
  }

  if (mockData.value == null)
    return { data: [] }

  const allProductImageList = mockData.value.productImages as any[]
  const productImageList = allProductImageList.filter(u => u.productId === productId)
  if (productImageList == null)
    return { data: [] }

  return { data: productImageList }
}
