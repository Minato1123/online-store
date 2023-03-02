import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface UpdateUserPasswordRequestData {
  id: number
  oldPassword: string
  newPassword: string
}

export function updateUserPasswordData(data: UpdateUserPasswordRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.patch<void>({
      url: `users/${data.id}`,
      data,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const userList = mockData.value.users as any[]

  const user = userList.find(u => u.id === data.id)
  if (user == null || user.deleted === true)
    return

  if (data.oldPassword && data.newPassword) {
    if (user.password === data.oldPassword)
      user.password = data.newPassword
  }
}
