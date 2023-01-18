import { http } from '@/utils/request'

export interface GetSubCategoryRequestData {
  id: number
}

export interface GetSubCategoryResponseData {
  categoryId: number
  name: string
  id: number
}

export function getSubCategory({ id }: GetSubCategoryRequestData) {
  return http.get<GetSubCategoryResponseData>({
    url: `/subCategories/${id}`,
  })
}
