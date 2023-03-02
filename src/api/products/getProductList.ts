import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface Pagination {
  first: number
  prev: number | null
  next: number | null
  last: number
}
export interface GetProductRequestData {
  currentPage: number
  pageSize: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductList({
  currentPage,
  pageSize,
  sortBy,
  orderBy,
}: GetProductRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<{
      productList: GetProductResponseData[]
      pagination: Pagination }>({
        url: '/products',
        params: {
          currentPage,
          pageSize,
          sortBy,
          orderBy,
        },
      })
  }

  if (mockData.value == null)
    return { data: {} }

  const productList = [...mockData.value.products]

  if (sortBy === 'id') {
    if (orderBy === 'asc')
      productList.sort((a, b) => a.id - b.id)
    else if (orderBy === 'desc')
      productList.sort((a, b) => b.id - a.id)
  }
  else if (sortBy === 'name') {
    if (orderBy === 'asc')
      productList.sort((a, b) => a.name.localeCompare(b.name))
    else if (orderBy === 'desc')
      productList.sort((a, b) => b.name.localeCompare(a.name))
  }
  else if (sortBy === 'price') {
    if (orderBy === 'asc')
      productList.sort((a, b) => a.price - b.price)
    else if (orderBy === 'desc')
      productList.sort((a, b) => b.price - a.price)
  }

  return {
    data: {
      productList: productList.slice(pageSize * (currentPage - 1), currentPage * pageSize),
      pagination: {
        first: 1,
        prev: currentPage > 1 ? currentPage - 1 : null,
        next: currentPage < Math.ceil(productList.length / pageSize) ? currentPage + 1 : null,
        last: Math.ceil(productList.length / pageSize),
      },
    },
  }
}
