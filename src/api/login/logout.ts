import { http } from '@/utils/request'

export function logout() {
  return http.post({
    url: '/logout',
  })
}
