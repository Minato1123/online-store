import type { Pagination } from '../products/getProductList'
import type { GetProductListFromFollowingByUserIdResponseData } from './getProductListFromFollowingByUserId'
import { http } from '@/utils/request'

export interface GetProductListFromFollowingByUserIdHasPageRequestData {
  currentPage: number
  pageSize: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
  userId: number
}

export function getProductListFromFollowingByUserIdHasPage({ currentPage, pageSize, sortBy, orderBy, userId }: GetProductListFromFollowingByUserIdHasPageRequestData) {
  return http.get<{
    productList: GetProductListFromFollowingByUserIdResponseData[]
    pagination: Pagination
  }>({
    url: '/followItems',
    params: {
      currentPage,
      pageSize,
      sortBy,
      orderBy,
      userId,
    },
  })
}
