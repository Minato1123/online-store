import type { GetProductResponseData } from './getProduct'
import type { Pagination } from './getProductList'
import { http } from '@/utils/request'

export interface GetProductListBySearchRequestData {
  currentPage: number
  pageSize: number
  query: string
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductListListBySearch({
  currentPage,
  pageSize,
  query,
  sortBy,
  orderBy,
}: GetProductListBySearchRequestData) {
  return http.get<{
    productList: GetProductResponseData[]
    pagination: Pagination
  }>({
    url: '/products',
    params: {
      currentPage,
      pageSize,
      query,
      sortBy,
      orderBy,
    },
  })
}
