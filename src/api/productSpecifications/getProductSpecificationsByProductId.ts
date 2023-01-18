import { http } from '@/utils/request'

export interface GetProductSpecificationsByProductIdRequestData {
  productId: number
}

export interface GetProductSpecificationsByProductIdResponseData {
  productId: number
  specName: string
  id: number
}

export function getProductSpecificationsByProductId({ productId }: GetProductSpecificationsByProductIdRequestData) {
  return http.get<GetProductSpecificationsByProductIdResponseData[]>({
    url: '/productSpecifications',
    params: {
      productId,
    },
  })
}
