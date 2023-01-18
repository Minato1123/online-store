import { http } from '@/utils/request'

export interface GetCategoryRequestData {
  id: number
}

export interface GetCategoryResponseData {
  id: number
  name: string
  icon: string
}

export function getCategory({ id }: GetCategoryRequestData) {
  return http.get<GetCategoryResponseData>({
    url: `/categories/${id}`,
  })
}
