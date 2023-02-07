<script setup lang="ts">
import PMain from '@/components/PMain.vue'
import { type GetProductListFromFollowingByUserIdHasPageRequestData, getProductListFromFollowingByUserIdHasPage } from '@/api/followItems/getProductListFromFollowingByUserIdHasPage'
import type { GetProductListFromFollowingByUserIdResponseData } from '@/api/followItems/getProductListFromFollowingByUserId'
import type { GetProductResponseData } from '@/api/products/getProduct'
import { useUsersStore } from '@/stores/user'
import { getProduct } from '@/api/products/getProduct'
import type { Pagination } from '@/api/products/getProductList'

const { userId } = storeToRefs(useUsersStore())
const currentPageFollowingItemList = ref<GetProductListFromFollowingByUserIdResponseData[]>()
const currentPageFollowingItemListPagination = ref<Pagination>()
const productList = ref<GetProductResponseData[]>([])
const paramsInFetchFollowingList = ref<GetProductListFromFollowingByUserIdHasPageRequestData>({
  currentPage: 1,
  pageSize: 6,
  sortBy: 'id',
  orderBy: 'asc',
  userId: userId.value,
})

async function fetchCurrentPageFollowingItemList() {
  const data = (await getProductListFromFollowingByUserIdHasPage(paramsInFetchFollowingList.value)).data
  currentPageFollowingItemList.value = data.productList
  currentPageFollowingItemListPagination.value = data.pagination
}

async function fetchCurrentPageFollowingProductList() {
  if (currentPageFollowingItemList.value == null)
    return
  productList.value = await Promise.all(currentPageFollowingItemList.value.map(async (item) => {
    const product = (await getProduct({ id: item.productId })).data
    return product
  }))
}

watch(paramsInFetchFollowingList, async () => {
  await fetchCurrentPageFollowingItemList()
  fetchCurrentPageFollowingProductList()
}, { deep: true })

onMounted(async () => {
  await fetchCurrentPageFollowingItemList()
  fetchCurrentPageFollowingProductList()
})
</script>

<template>
  <div class="follow-container">
    <div class="follow-bar">
      追蹤清單
    </div>
    <PMain
      v-if="productList != null && currentPageFollowingItemList != null"
      v-model:current-page="paramsInFetchFollowingList.currentPage"
      v-model:page-size="paramsInFetchFollowingList.pageSize"
      v-model:sort-by="paramsInFetchFollowingList.sortBy"
      v-model:order-by="paramsInFetchFollowingList.orderBy"
      :product-list="productList"
      :total-num-of-products="10"
      :pagination="currentPageFollowingItemListPagination"
      :has-page-attr="false"
    />
    <div v-if="productList.length <= 0" class="empty-follow">
      目前追蹤清單還沒有商品喔！
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
      font-size: 1.5rem;
      color: var(--text-color);
    }
  }
</style>
