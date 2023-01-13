import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export interface GetProductByCategoryRequestData {
  currentPage: number
  pageSize: number
  categoryId: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductListByCategory({ currentPage, pageSize, categoryId, sortBy, orderBy }: GetProductByCategoryRequestData) {
  return http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      _page: currentPage,
      _limit: pageSize,
      categoryId,
      _sort: sortBy,
      _order: orderBy,
    },
  })
}
