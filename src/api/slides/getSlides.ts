import { http } from '@/utils/request'

export interface getSlideListResponseData {
  id: number
  imageUrl: string
  imageTabletUrl: string
  imageMobileUrl: string
}

export function getSlides() {
  return http.get<getSlideListResponseData[]>({
    url: '/slides',
  })
}
