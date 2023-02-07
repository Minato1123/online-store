import { http } from '@/utils/request'

export async function getTotalNumOfProducts() {
  return await http.get<{ numOfProducts: number }>({
    url: '/numOfProducts',
  })
}
