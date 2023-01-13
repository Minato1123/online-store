import type { GetProductResponseData } from './getProduct'
import { http } from '@/utils/request'

export interface GetProductBySubCategoryRequestData {
  categoryId: number
  subCategoryId: number
}

export async function getTotalNumOfProductsBySubCategory({ categoryId, subCategoryId }: GetProductBySubCategoryRequestData) {
  const { data: productListBySubCategory } = await http.get<GetProductResponseData[]>({
    url: '/products',
    params: {
      categoryId,
      subCategoryId,
    },
  })
  return productListBySubCategory.length
}
