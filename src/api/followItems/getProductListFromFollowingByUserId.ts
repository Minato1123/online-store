import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface GetProductListFromFollowingByUserIdRequestData {
  userId: number
}

export interface GetProductListFromFollowingByUserIdResponseData {
  id: number
  userId: number
  productId: number
}

export function getProductListFromFollowingByUserId({ userId }: GetProductListFromFollowingByUserIdRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetProductListFromFollowingByUserIdResponseData[]>({
      url: '/followItems',
      params: {
        userId,
      },
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: [] }
  }

  if (mockData.value == null)
    return { data: [] }

  const followItems = mockData.value.followItems as any[]
  return { data: followItems.filter(item => item.userId === userId) }
}
