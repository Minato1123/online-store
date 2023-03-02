import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

export interface GetCurrentUserRequestData {
  id: number
}

export interface GetCurrentUserResponseData {
  id: number
  name: string
  email: string
  birthday: string
  mobile: string
  address: string
  createdAt: string
}

export function getCurrentUser({ id }: GetCurrentUserRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.get<GetCurrentUserResponseData>({
      url: `/users/${id}`,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return { data: {} as GetCurrentUserResponseData }
  }

  if (mockData.value == null)
    return { data: {} as GetCurrentUserResponseData }

  const userList = mockData.value.users as any[]

  const user = userList.find(u => u.id === id)
  if (user == null || user.deleted === true)
    return { data: {} as GetCurrentUserResponseData }

  return {
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      mobile: user.mobile,
      address: user.address,
      createdAt: user.createdAt,
    },
  }
}
