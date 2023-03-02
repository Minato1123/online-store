import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export function logout() {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { tokenMap, isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.post({
      url: '/logout',
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  tokenMap.delete(userToken)
}
