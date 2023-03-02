import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface DeleteProductFromFollowingRequestData {
  id: number
}

export function deleteProductFromFollowing({ id }: DeleteProductFromFollowingRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.delete<void>({
      url: `/followItems/${id}`,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const followItemList = mockData.value.followItems as any[]

  const index = followItemList.findIndex(item => item.id === id)
  if (index !== -1)
    followItemList.splice(index, 1)
}
