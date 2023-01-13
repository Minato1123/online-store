import { http } from '@/utils/request'

export interface GetCategoryRequestData {
  id: number
}

export interface GetCategoryResponseData {
  id: number
  name: string
  path: string
  icon: string
  isOpen: boolean
  subCategories: {
    id: number
    name: string
    path: string
  }[]
}

export function getCategory(requestData: GetCategoryRequestData) {
  return http.get<GetCategoryResponseData>({
    url: `/categories/${requestData.id}`,
  })
}
