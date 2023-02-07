import type { GetProductResponseData } from './getProduct'
import type { Pagination } from './getProductList'
import { http } from '@/utils/request'

export interface GetProductByCategoryRequestData {
  currentPage: number
  pageSize: number
  categoryId: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductListByCategory({ currentPage, pageSize, categoryId, sortBy, orderBy }: GetProductByCategoryRequestData) {
  return http.get<{
    productList: GetProductResponseData[]
    pagination: Pagination
  }
  >({
    url: '/products',
    params: {
      currentPage,
      pageSize,
      categoryId,
      sortBy,
      orderBy,
    },
  })
}
