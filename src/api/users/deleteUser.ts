import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface DeleteUserRequestData {
  id: number
}

export function deleteUser({ id }: DeleteUserRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.delete<void>({
      url: `/users/${id}`,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const userList = mockData.value.users as any[]

  const user = userList.find(u => u.id === id)
  if (user)
    user.deleted = true
}
