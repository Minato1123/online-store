import { http } from '@/utils/request'

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
  return http.get<GetProductResponseData>({
    url: `/products/${id}`,
  })
}
