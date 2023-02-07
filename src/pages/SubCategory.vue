<script setup lang="ts">
import _ from 'lodash-es'
import PMain from '@/components/PMain.vue'
import { type GetCategoryResponseData, getCategory } from '@/api/categories/getCategory'
import { getProductListBySubCategory } from '@/api/products/getProductListBySubCategory'
import { getTotalNumOfProductsBySubCategory } from '@/api/products/getTotalNumOfProductsBySubCategory'
import type { GetProductBySubCategoryRequestData } from '@/api/products/getProductListBySubCategory'
import type { GetProductResponseData } from '@/api/products/getProduct'
import { getSubCategory } from '@/api/subCategories/getSubCategory'
import type { GetSubCategoryResponseData } from '@/api/subCategories/getSubCategory'
import type { Pagination } from '@/api/products/getProductList'

const route = useRoute()
const categoryId = computed(() => route.params.categoryId)
const subCategoryId = computed(() => route.params.subCategoryId)

const productListBySubCategory = ref<GetProductResponseData[]>()
const productListBySubCategoryPagination = ref<Pagination>()
const totalNumOfProductsBySubCategory = ref<number>()
const category = ref<GetCategoryResponseData>()
const subcategory = ref<GetSubCategoryResponseData>()
const fetchProductListBySubCategoryParams = ref<GetProductBySubCategoryRequestData>({
  currentPage: 1,
  pageSize: 6,
  subCategoryId: +subCategoryId.value,
  sortBy: 'id',
  orderBy: 'asc',
})
async function fetchProductListByCategory() {
  const data = (await getProductListBySubCategory(fetchProductListBySubCategoryParams.value)).data
  productListBySubCategory.value = data.productList
  productListBySubCategoryPagination.value = data.pagination
}
async function fetchTotalNumOfProductsByCategory() {
  totalNumOfProductsBySubCategory.value = (await getTotalNumOfProductsBySubCategory({ subCategoryId: +subCategoryId.value })).data.numOfProducts
}
async function fetchCategory() {
  category.value = (await getCategory({ id: +categoryId.value })).data
}
async function fetchSubCategory() {
  subcategory.value = (await getSubCategory({ id: +subCategoryId.value })).data
}

watch([categoryId, subCategoryId], async () => {
  fetchProductListBySubCategoryParams.value.subCategoryId = +subCategoryId.value
  await fetchProductListByCategory()
  await fetchCategory()
  await fetchSubCategory()
  await fetchTotalNumOfProductsByCategory()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

watch(fetchProductListBySubCategoryParams, async () => {
  await fetchProductListByCategory()
  await fetchCategory()
  await fetchSubCategory()
  await fetchTotalNumOfProductsByCategory()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, { deep: true })

onMounted(() => {
  fetchProductListByCategory()
  fetchCategory()
  fetchSubCategory()
  fetchTotalNumOfProductsByCategory()
})
</script>

<template>
  <div class="home-container">
    <div v-if="subcategory != null" class="title">
      {{ subcategory.name }}
    </div>
    <PMain
      v-if="productListBySubCategory != null"
      v-model:current-page="fetchProductListBySubCategoryParams.currentPage"
      v-model:page-size="fetchProductListBySubCategoryParams.pageSize"
      v-model:sort-by="fetchProductListBySubCategoryParams.sortBy"
      v-model:order-by="fetchProductListBySubCategoryParams.orderBy"
      :link-category-id="+categoryId"
      :link-sub-category-id="+subCategoryId"
      :product-list="productListBySubCategory"
      :total-num-of-products="totalNumOfProductsBySubCategory"
      :pagination="productListBySubCategoryPagination"
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
