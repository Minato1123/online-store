import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'

export interface GetSlideListResponseData {
  id: number
  imageUrl: string
  imageTabletUrl: string
  imageMobileUrl: string
}

export function getSlides() {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())

  if (!isMocked.value) {
    return http.get<GetSlideListResponseData[]>({
      url: '/slides',
    })
  }

  if (mockData.value == null)
    return { data: [] }

  return { data: mockData.value.slides }
}
