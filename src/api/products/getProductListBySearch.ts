import type { GetProductResponseData } from './getProduct'
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
  return http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      _page: currentPage,
      _limit: pageSize,
      name_like: query,
      _sort: sortBy,
      _order: orderBy,
    },
  })
}
