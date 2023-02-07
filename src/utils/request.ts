import { useUsersStore } from '@/stores/user'

export interface Response<T> {
  data: T
}

async function request<T>(config: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  params?: Record<string, any>
  data?: any
}): Promise<Response<T>> {
  const urlObj = new URL(config.url, `${window.location.protocol}//${window.location.hostname}:3000`)
  if (config.params) {
    const params = config.params
    Object.keys(params).forEach((key) => {
      urlObj.searchParams.append(key, params[key])
    })
  }
  const response = await fetch(urlObj.href, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('user-token') ?? '',
    },
    body: JSON.stringify(config.data),
  })

  if (response.ok) {
    return {
      data: await response.json(),
    }
  }

  if (response.status === 401)
    useUsersStore().forcedLogout()

  throw new Error(response.statusText)
}

export const http = {
  request,

  get<T>(config: {
    url: string
    params?: Record<string, any>
  }) {
    return request<T>({
      method: 'GET',
      ...config,
    })
  },

  post<T>(config: {
    url: string
    params?: Record<string, any>
    data?: any
  }) {
    return request<T>({
      method: 'POST',
      ...config,
    })
  },

  put<T>(config: {
    url: string
    params?: Record<string, any>
    data?: any
  }) {
    return request<T>({
      method: 'PUT',
      ...config,
    })
  },

  patch<T>(config: {
    url: string
    params?: Record<string, any>
    data?: any
  }) {
    return request<T>({
      method: 'PATCH',
      ...config,
    })
  },

  delete<T>(config: {
    url: string
    params?: Record<string, any>
  }) {
    return request<T>({
      method: 'DELETE',
      ...config,
    })
  },
}

