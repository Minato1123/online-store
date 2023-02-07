import { http } from '@/utils/request'

export interface GetProductBySubCategoryRequestData {
  subCategoryId: number
}

export async function getTotalNumOfProductsBySubCategory({ subCategoryId }: GetProductBySubCategoryRequestData) {
  return await http.get<{ numOfProducts: number }>({
    url: '/numOfProducts',
    params: {
      subCategoryId,
    },
  })
}
