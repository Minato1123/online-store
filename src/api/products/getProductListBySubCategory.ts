import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export interface GetProductBySubCategoryRequestData {
  currentPage: number
  pageSize: number
  categoryId: number
  subCategoryId: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductListBySubCategory({
  currentPage,
  pageSize,
  categoryId,
  subCategoryId,
  sortBy,
  orderBy,
}: GetProductBySubCategoryRequestData) {
  return http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      _page: currentPage,
      _limit: pageSize,
      categoryId,
      subCategoryId,
      _sort: sortBy,
      _order: orderBy,
    },
  })
}
