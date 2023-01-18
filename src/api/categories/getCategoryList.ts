import type { GetCategoryResponseData } from './getCategory'
import { http } from '@/utils/request'

export function getCategoryList() {
  return http.get<GetCategoryResponseData[]>({
    url: '/categories',
  })
}
