import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetProductRequestData {
  id: number
}

export interface GetProductResponseData {
  id: number
  name: string
  categoryId: number
  subCategoryId: number
  price: number
  size: string
  wrapSize: string
  origin: string
  material: string
  content: string | null
  weight: string
}

export function getProduct({ id }: GetProductRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetProductResponseData>({
      url: `/products/${id}`,
    })
  }

  if (mockData.value == null)
    return { data: {} }

  const productList = mockData.value.products as any[]

  const product = productList.find(u => u.id === id)
  if (product == null)
    return { data: {} }

  return { data: product }
}
