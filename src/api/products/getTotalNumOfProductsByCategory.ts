import { http } from '@/utils/request'

export interface GetProductByCategoryRequestData {
  categoryId: number
}

export async function getTotalNumOfProductsByCategory({ categoryId }: GetProductByCategoryRequestData) {
  return await http.get<{ numOfProducts: number }>({
    url: '/numOfProducts',
    params: {
      categoryId,
    },
  })
}
