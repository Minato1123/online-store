import type { GetProductResponseData } from './getProduct'
import type { Pagination } from './getProductList'
import { useMockDataStore } from '@/stores/mock'
import { http } from '@/utils/request'

export interface GetProductBySubCategoryRequestData {
  currentPage: number
  pageSize: number
  subCategoryId: number
  sortBy: 'id' | 'name' | 'price'
  orderBy: 'asc' | 'desc'
}

export function getProductListBySubCategory({
  currentPage,
  pageSize,
  subCategoryId,
  sortBy,
  orderBy,
}: GetProductBySubCategoryRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<{
      productList: GetProductResponseData[]
      pagination: Pagination }>({
        url: '/products',
        params: {
          currentPage,
          pageSize,
          subCategoryId,
          sortBy,
          orderBy,
        },
      })
  }

  if (mockData.value == null)
    return { data: {} }

  let productList = [...mockData.value.products]
  productList = productList.filter(p => p.subCategoryId === subCategoryId)

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
