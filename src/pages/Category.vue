<script setup lang="ts">
import _ from 'lodash-es'
import PMain from '@/components/PMain.vue'
import { getProductListByCategory } from '@/api/products/getProductListByCategory'
import { getTotalNumOfProductsByCategory } from '@/api/products/getTotalNumOfProductsByCategory'
import { getCategory } from '@/api/categories/getCategory'
import type { GetProductByCategoryRequestData } from '@/api/products/getProductListByCategory'
import type { GetProductResponseData } from '@/api/products/getProduct'
import type { GetCategoryResponseData } from '@/api/categories/getCategory'
import type { Pagination } from '@/api/products/getProductList'

const route = useRoute()
const categoryId = computed(() => route.params.categoryId)

const productListByCategory = ref<GetProductResponseData[]>()
const productsByCategoryPagination = ref<Pagination>()
const totalNumOfProductsByCategory = ref<number>()
const category = ref<GetCategoryResponseData>()
const fetchProductListByCategoryParams = ref<GetProductByCategoryRequestData>({
  currentPage: 1,
  pageSize: 6,
  categoryId: +categoryId.value,
  sortBy: 'id',
  orderBy: 'asc',
})
async function fetchProductListByCategory() {
  const data = (await getProductListByCategory(fetchProductListByCategoryParams.value)).data
  productListByCategory.value = data.productList
  productsByCategoryPagination.value = data.pagination
}
async function fetchTotalNumOfProductsByCategory() {
  totalNumOfProductsByCategory.value = (await getTotalNumOfProductsByCategory({ categoryId: +categoryId.value })).data.numOfProducts
}
async function fetchCategory() {
  category.value = (await getCategory({ id: +categoryId.value })).data
}

watch(categoryId, async () => {
  fetchProductListByCategoryParams.value.categoryId = +categoryId.value
  await fetchProductListByCategory()
  await fetchCategory()
  await fetchTotalNumOfProductsByCategory()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

watch(fetchProductListByCategoryParams, async () => {
  await fetchProductListByCategory()
  await fetchCategory()
  await fetchTotalNumOfProductsByCategory()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, { deep: true })

onMounted(() => {
  fetchProductListByCategory()
  fetchCategory()
  fetchTotalNumOfProductsByCategory()
})
</script>

<template>
  <div class="home-container">
    <div v-if="category != null" class="title">
      {{ category.name }}
    </div>
    <PMain
      v-if="productListByCategory != null"
      v-model:current-page="fetchProductListByCategoryParams.currentPage"
      v-model:page-size="fetchProductListByCategoryParams.pageSize"
      v-model:sort-by="fetchProductListByCategoryParams.sortBy"
      v-model:order-by="fetchProductListByCategoryParams.orderBy"
      :link-category-id="+categoryId"
      :product-list="productListByCategory"
      :total-num-of-products="totalNumOfProductsByCategory"
      :pagination="productsByCategoryPagination"
      :has-page-attr="true"
    />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  margin: 3rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 80%;
    margin-bottom: 1rem;
    color: var(--main-product-color);
    font-size: 1.8rem;
    text-align: center;
  }
}
</style>
