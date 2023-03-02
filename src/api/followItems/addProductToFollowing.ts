import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface AddProductToFollowingRequestData {
  userId: number
  productId: number
}

export function addProductToFollowing(data: AddProductToFollowingRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.post<void>({
      url: '/followItems',
      data,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const followItemList = mockData.value.followItems as any[]
  const followItemId = followItemList.length > 0 ? followItemList[followItemList.length - 1].id + 1 : 1

  followItemList.push({
    id: followItemId,
    userId: data.userId,
    productId: data.productId,
  })
}
