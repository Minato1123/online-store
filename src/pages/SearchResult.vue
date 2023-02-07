<script setup lang="ts">
import PMain from '@/components/PMain.vue'
import type { Response } from '@/utils/request'
import { type GetProductListBySearchRequestData, getProductListListBySearch } from '@/api/products/getProductListBySearch'
import type { GetProductResponseData } from '@/api/products/getProduct'
import type { Pagination } from '@/api/products/getProductList'

const route = useRoute()
const queryKeyword = computed(() => String(route.query.keyword))

const productList = ref<GetProductResponseData[]>()
const productListPagination = ref<Pagination>()
const paramsInFetchProductListBySearch = ref<GetProductListBySearchRequestData>({
  currentPage: 1,
  pageSize: 6,
  query: queryKeyword.value,
  sortBy: 'id',
  orderBy: 'asc',
})

async function fetchCurrentPageProductListBySearch() {
  const data = (await getProductListListBySearch(paramsInFetchProductListBySearch.value)).data
  productList.value = data.productList
  productListPagination.value = data.pagination
}

watch([paramsInFetchProductListBySearch, queryKeyword], async () => {
  paramsInFetchProductListBySearch.value.query = queryKeyword.value
  await fetchCurrentPageProductListBySearch()
}, { deep: true })

onMounted(() => {
  fetchCurrentPageProductListBySearch()
})
</script>

<template>
  <div class="follow-container">
    <div class="follow-bar">
      {{ paramsInFetchProductListBySearch.query }} 的搜尋結果：
    </div>
    <PMain
      v-if="productList != null && productList.length > 0"
      v-model:current-page="paramsInFetchProductListBySearch.currentPage"
      v-model:page-size="paramsInFetchProductListBySearch.pageSize"
      v-model:sort-by="paramsInFetchProductListBySearch.sortBy"
      v-model:order-by="paramsInFetchProductListBySearch.orderBy"
      :product-list="productList"
      :total-num-of-products="0"
      :pagination="productListPagination"
      :has-page-attr="false"
    />
    <div v-else class="empty-follow">
      沒有搜尋到任何商品。
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .follow-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 0 1rem 0;

    .follow-bar {
      width: 80%;
      background-color: var(--main-product-color);
      color: var(--white-color);
      border-radius: 20rem;
      padding: 0.3rem 1rem;
    }

    .follow-products {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 1.5%;
    }

    .empty-follow {
      margin-top: 3rem;
      font-size: 1.5rem;
      color: var(--text-color);
    }
  }
</style>
