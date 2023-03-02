import type { Pagination } from '../products/getProductList'
import type { GetProductListFromFollowingByUserIdResponseData } from './getProductListFromFollowingByUserId'
import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface GetProductListFromFollowingByUserIdHasPageRequestData {
  currentPage: number
  pageSize: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
  userId: number
}

export function getProductListFromFollowingByUserIdHasPage({ currentPage, pageSize, sortBy, orderBy, userId }: GetProductListFromFollowingByUserIdHasPageRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
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

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: {} }
  }

  if (mockData.value == null)
    return { data: {} }

  const followingItems = mockData.value.followItems as any[]
  const followingItemList = followingItems.filter(item => item.userId === userId)

  if (sortBy === 'id') {
    if (orderBy === 'asc')
      followingItemList.sort((a, b) => a.id - b.id)
    else if (orderBy === 'desc')
      followingItemList.sort((a, b) => b.id - a.id)
  }

  return {
    data: {
      productList: followingItemList.slice(pageSize * (currentPage - 1), currentPage * pageSize),
      pagination: {
        first: 1,
        prev: currentPage > 1 ? currentPage - 1 : null,
        next: currentPage < Math.ceil(followingItemList.length / pageSize) ? currentPage + 1 : null,
        last: Math.ceil(followingItemList.length / pageSize),
      },
    },
  }
}
