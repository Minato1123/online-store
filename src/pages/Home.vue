<script setup lang="ts">
import _ from 'lodash-es'
import Slide from '../components/Slide.vue'
import { getSlides } from '@/api/slides/getSlides'
import type { getSlideListResponseData } from '@/api/slides/getSlides'
import { getProductList } from '@/api/products/getProductList'
import type { GetProductRequestData } from '@/api/products/getProductList'
import type { SlideType } from '@/types'
import type { Response } from '@/utils/request'
import PMain from '@/components/PMain.vue'
import type { GetProductResponseData } from '@/api/products/getProduct'
import { getTotalNumOfProducts } from '@/api/products/getTotalNumOfProducts'

const slideList = ref<getSlideListResponseData[]>()
async function fetchSlides() {
  const s = await getSlides()
  slideList.value = s.data
}

const productList = ref<Response<GetProductResponseData[]>>()
const totalNumOfProducts = ref<number>()
const fetchProductListParams = ref<GetProductRequestData>({
  currentPage: 1,
  pageSize: 6,
  sortBy: 'id',
  orderBy: 'asc',
})
async function fetchProductList() {
  productList.value = await getProductList(fetchProductListParams.value)
}
async function fetchTotalNumOfProducts() {
  totalNumOfProducts.value = await getTotalNumOfProducts()
}

watch(fetchProductListParams, async () => {
  await fetchProductList()
  window.scrollTo({ top: 400, behavior: 'smooth' })
}, { deep: true })

// 視窗寬度
const windowWidth = ref(window.innerWidth)

function getWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', getWidth)
  fetchSlides()
  fetchProductList()
  fetchTotalNumOfProducts()
})

onUnmounted(() =>
  window.removeEventListener('resize', getWidth),
)

const slideHeight = computed<string>(() => {
  if (windowWidth.value > 991)
    return '41.6666666667%'
  else if (windowWidth.value > 575)
    return '58.52%'
  else
    return '104%'
})
const slideImgs = computed<string[]>(() => {
  if (slideList.value == null)
    return []
  if (windowWidth.value > 991)
    return slideList.value.map(item => item.imageUrl)
  else if (windowWidth.value > 575)
    return slideList.value.map(item => item.imageTabletUrl)
  else
    return slideList.value.map(item => item.imageMobileUrl)
})
const slidesConfig = computed<SlideType>(() => {
  return {
    slides: slideImgs.value ?? [],
    height: slideHeight.value,
    hasPage: true,
    hasTimeInterval: true,
    btnColor: 'white',
  }
})
</script>

<template>
  <div class="home-container">
    <Slide :slides-config="slidesConfig" />
    <PMain
      v-if="productList != null"
      v-model:current-page="fetchProductListParams.currentPage"
      v-model:page-size="fetchProductListParams.pageSize"
      v-model:sort-by="fetchProductListParams.sortBy"
      v-model:order-by="fetchProductListParams.orderBy"
      :product-list="productList.data"
      :total-num-of-products="totalNumOfProducts"
      :pagination="productList.pagination"
    />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
