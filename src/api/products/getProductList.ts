import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

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
  return http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      _page: currentPage,
      _limit: pageSize,
      _sort: sortBy,
      _order: orderBy,
    },
  })
}
