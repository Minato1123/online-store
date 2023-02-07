import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export interface Pagination {
  first: number
  prev: number | null
  next: number | null
  last: number
}
export interface GetProductRequestData {
  currentPage: number
  pageSize: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductList({
  currentPage,
  pageSize,
  sortBy,
  orderBy,
}: GetProductRequestData) {
  return http.get<{
    productList: GetProductResponseData[]
    pagination: Pagination }>({
      url: '/products',
      params: {
        currentPage,
        pageSize,
        sortBy,
        orderBy,
      },
    })
}
