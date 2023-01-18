import type { GetSubCategoryResponseData } from './getSubCategory'
import { http } from '@/utils/request'

export interface GetSubCategoryRequestData {
  categoryId: number
}

export function getSubCategoryList({ categoryId }: GetSubCategoryRequestData) {
  return http.get<GetSubCategoryResponseData[]>({
    url: '/subCategories',
    params: {
      categoryId,
    },
  })
}
