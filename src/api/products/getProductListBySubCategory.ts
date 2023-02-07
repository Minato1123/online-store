import type { GetProductResponseData } from './getProduct'
import type { Pagination } from './getProductList'
import { http } from '@/utils/request'

export interface GetProductBySubCategoryRequestData {
  currentPage: number
  pageSize: number
  subCategoryId: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductListBySubCategory({
  currentPage,
  pageSize,
  subCategoryId,
  sortBy,
  orderBy,
}: GetProductBySubCategoryRequestData) {
  return http.get<{
    productList: GetProductResponseData[]
    pagination: Pagination }>({
      url: '/products',
      params: {
        currentPage,
        pageSize,
        subCategoryId,
        sortBy,
        orderBy,
      },
    })
}
