import { http } from '@/utils/request'

export interface loginRequestData {
  data: {
    email: string
    password: string
  }
}

export interface loginResponseData {
  token: string
  userId: number
}

export function login({ data }: loginRequestData) {
  return http.post<loginResponseData>({
    url: '/login',
    data,
  })
}
