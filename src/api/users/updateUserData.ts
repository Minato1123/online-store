import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface UpdateUserRequestData {
  id: number
  name: string
  email: string
  birthday: string
  mobile: string
  address: string
}

export function updateUserData(data: UpdateUserRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.patch<void>({
      url: `/users/${data.id}`,
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

  if (data.name == null || data.email == null || data.birthday == null || data.mobile == null || data.address == null)
    return

  user.name = data.name
  user.email = data.email
  user.birthday = data.birthday
  user.mobile = data.mobile
  user.address = data.address
}
