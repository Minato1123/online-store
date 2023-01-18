import { http } from '@/utils/request'

export interface GetProductImagesByProductIdRequestData {
  productId: number
}

export interface GetProductImagesByProductIdResponseData {
  productId: number
  image: string
  id: number
}

export function getProductImagesByProductId({ productId }: GetProductImagesByProductIdRequestData) {
  return http.get<GetProductImagesByProductIdResponseData[]>({
    url: '/productImages',
    params: {
      productId,
    },
  })
}
