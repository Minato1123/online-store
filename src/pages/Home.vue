<script setup lang="ts">
import _ from 'lodash-es'
import Slide from '../components/Slide.vue'
import { useLoadingStore } from '../stores/loading'
import { getSlides } from '@/api/slides/getSlides'
import type { GetSlideListResponseData } from '@/api/slides/getSlides'
import { getProductList } from '@/api/products/getProductList'
import type { GetProductRequestData, Pagination } from '@/api/products/getProductList'
import type { SlideType } from '@/types'
import PMain from '@/components/PMain.vue'
import type { GetProductResponseData } from '@/api/products/getProduct'
import { getTotalNumOfProducts } from '@/api/products/getTotalNumOfProducts'

const { startLoading, endLoading } = useLoadingStore()

const slideList = ref<GetSlideListResponseData[]>()
async function fetchSlides() {
  startLoading()
  const s = await getSlides()
  endLoading()
  slideList.value = s.data
}

const productList = ref<GetProductResponseData[]>()
const productPagination = ref<Pagination>()
const totalNumOfProducts = ref<number>()
const fetchProductListParams = ref<GetProductRequestData>({
  currentPage: 1,
  pageSize: 6,
  sortBy: 'id',
  orderBy: 'asc',
})
async function fetchProductList() {
  startLoading()
  const data = (await getProductList(fetchProductListParams.value)).data
  endLoading()
  productList.value = data.productList
  productPagination.value = data.pagination
}
async function fetchTotalNumOfProducts() {
  startLoading()
  totalNumOfProducts.value = (await getTotalNumOfProducts()).data.numOfProducts
  endLoading()
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
      :product-list="productList"
      :total-num-of-products="totalNumOfProducts"
      :pagination="productPagination"
      :has-page-attr="true"
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
