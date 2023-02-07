import { http } from '@/utils/request'

export interface GetSlideListResponseData {
  id: number
  imageUrl: string
  imageTabletUrl: string
  imageMobileUrl: string
}

export function getSlides() {
  return http.get<GetSlideListResponseData[]>({
    url: '/slides',
  })
}
