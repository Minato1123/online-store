import type { getProductListFromFollowingByUserIdResponseData } from './getProductListFromFollowingByUserId'
import { http } from '@/utils/request'

export interface getProductListFromFollowingByUserIdHasPageRequestData {
  currentPage: number
  pageSize: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
  userId: number
}

export function getProductListFromFollowingByUserIdHasPage({ currentPage, pageSize, sortBy, orderBy, userId }: getProductListFromFollowingByUserIdHasPageRequestData) {
  return http.get<getProductListFromFollowingByUserIdResponseData[]>({
    url: '/followItems',
    params: {
      _page: currentPage,
      _limit: pageSize,
      _sort: sortBy,
      _order: orderBy,
      userId,
    },
  })
}
