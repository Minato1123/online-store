<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'
import { type GetOrderSerialNumberByStatusResponseData, getOrderSerialNumberByStatus } from '@/api/orders/getOrderSerialNumberByStatus'
import { useUsersStore } from '@/stores/user'
import { type GetProductListFromBoughtByOrderIdResponseData, getProductListFromBoughtByOrderId } from '@/api/boughtItems/getProductListFromBoughtByOrderId'
const { userId, isLoggedIn } = storeToRefs(useUsersStore())

const serialNumberForPrepared = ref<GetOrderSerialNumberByStatusResponseData[]>([])
const boughtItemsInPrepared = ref<GetProductListFromBoughtByOrderIdResponseData[]>([])
const serialNumberForShipped = ref<GetOrderSerialNumberByStatusResponseData[]>([])
const boughtItemsInShipped = ref<GetProductListFromBoughtByOrderIdResponseData[]>([])
const serialNumberForCompleted = ref<GetOrderSerialNumberByStatusResponseData[]>([])
const boughtItemsInCompleted = ref<GetProductListFromBoughtByOrderIdResponseData[]>([])

async function fetchBoughtItemsInPrepared() {
  serialNumberForPrepared.value = (await getOrderSerialNumberByStatus({ userId: userId.value, status: 'prepared' })).data
  await Promise.all(serialNumberForPrepared.value.map(async (item) => {
    const { data } = await getProductListFromBoughtByOrderId({ orderId: item.serialNumber })
    boughtItemsInPrepared.value.push(...data)
  }))
}

async function fetchBoughtItemsInShipped() {
  serialNumberForShipped.value = (await getOrderSerialNumberByStatus({ userId: userId.value, status: 'shipped' })).data
  await Promise.all(serialNumberForShipped.value.map(async (item) => {
    const { data } = await getProductListFromBoughtByOrderId({ orderId: item.serialNumber })
    boughtItemsInShipped.value.push(...data)
  }))
}

async function fetchBoughtItemsInCompleted() {
  serialNumberForCompleted.value = (await getOrderSerialNumberByStatus({ userId: userId.value, status: 'completed' })).data
  await Promise.all(serialNumberForCompleted.value.map(async (item) => {
    const { data } = await getProductListFromBoughtByOrderId({ orderId: item.serialNumber })
    boughtItemsInCompleted.value.push(...data)
  }))
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
              <th>商品名稱</th>
              <th>規格</th>
              <th>數量</th>
              <th>總計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in boughtItemsInPrepared" :key="`prepared-${i + 1}`" class="item">
              <td>{{ item.name }}</td>
              <td>{{ item.specificationName }}</td>
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
