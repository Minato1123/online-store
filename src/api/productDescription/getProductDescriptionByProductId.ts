import { http } from '@/utils/request'

export interface GetProductDescriptionByProductIdRequestData {
  productId: number
}

export interface GetProductDescriptionByProductIdResponseData {
  productId: number
  description: string
  id: number
}

export function getProductDescriptionByProductId({ productId }: GetProductDescriptionByProductIdRequestData) {
  return http.get<GetProductDescriptionByProductIdResponseData[]>({
    url: '/productDescription',
    params: {
      productId,
    },
  })
}
