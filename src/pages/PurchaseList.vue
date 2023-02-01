<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'
import type { GetProductListFromBoughtInPreparedResponseData } from '@/api/boughtItems/getProductListFromBoughtInPrepared'
import { getProductListFromBoughtInPrepared } from '@/api/boughtItems/getProductListFromBoughtInPrepared'
import type { GetProductListFromBoughtInShippedResponseData } from '@/api/boughtItems/getProductListFromBoughtInShipped'
import { getProductListFromBoughtInShipped } from '@/api/boughtItems/getProductListFromBoughtInShipped'
import type { GetProductListFromBoughtInCompletedResponseData } from '@/api/boughtItems/getProductListFromBoughtInCompleted'
import { getProductListFromBoughtInCompleted } from '@/api/boughtItems/getProductListFromBoughtInCompleted'
import { useUsersStore } from '@/stores/user'
const { userId, isLoggedIn } = storeToRefs(useUsersStore())

const boughtItemsInPrepared = ref<GetProductListFromBoughtInPreparedResponseData[]>([])
const boughtItemsInShipped = ref<GetProductListFromBoughtInShippedResponseData[]>([])
const boughtItemsInCompleted = ref<GetProductListFromBoughtInCompletedResponseData[]>([])
async function fetchBoughtItemsInPrepared() {
  boughtItemsInPrepared.value = (await getProductListFromBoughtInPrepared({ userId: userId.value })).data
}

async function fetchBoughtItemsInShipped() {
  boughtItemsInShipped.value = (await getProductListFromBoughtInShipped({ userId: userId.value })).data
}

async function fetchBoughtItemsInCompleted() {
  boughtItemsInCompleted.value = (await getProductListFromBoughtInCompleted({ userId: userId.value })).data
}

onMounted(() => {
  fetchBoughtItemsInPrepared()
  fetchBoughtItemsInShipped()
  fetchBoughtItemsInCompleted()
})
</script>

<template>
  <PUserLayout>
    <div v-if="isLoggedIn" class="purchase-list-container">
      <div class="order-prepared-block block">
        <div class="subtitle">
          訂單準備中
        </div>
        <table v-if="boughtItemsInPrepared.length > 0" class="order-content">
          <thead>
            <tr class="item">
              <th>編號</th>
              <th>商品名稱</th>
              <th>規格</th>
              <th>數量</th>
              <th>總計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in boughtItemsInPrepared" :key="`prepared-${i + 1}`" class="item">
              <td>{{ i + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.specification }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.price * item.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="order-shipped-block block">
        <div class="subtitle">
          訂單已出貨
        </div>
        <div class="order-shipped-content">
          <div />
        </div>
      </div>
      <div class="order-completed-block block">
        <div class="subtitle">
          訂單完成
        </div>
        <div class="order-completed-content">
          <div />
        </div>
      </div>
    </div>
  </PUserLayout>
</template>

<style lang="scss" scoped>
  .purchase-list-container {
    padding: 2rem;

    .block {
      width: 100%;
      min-height: 6rem;
    }
    .subtitle {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 1rem 0;
      color: var(--main-color)
    }
    .order-content {
      width: 100%;
      color: var(--text-color);

      th, td {
        height: 1.5rem;
        text-align: center;
      }
      .item {
        width: 100%;
        padding: 0.5rem 0;
      }
    }
  }
</style>
