<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'
import OrderDialog from '@/components/OrderDialog.vue'
import { type GetOrderSerialNumberByStatusResponseData, getOrderSerialNumberByStatus } from '@/api/orders/getOrderSerialNumberByStatus'
import { useUsersStore } from '@/stores/user'
import { type GetProductListFromBoughtByOrderIdResponseData, getProductListFromBoughtByOrderId } from '@/api/boughtItems/getProductListFromBoughtByOrderId'
const { userId, isLoggedIn } = storeToRefs(useUsersStore())

const orderListForPrepared = ref<GetOrderSerialNumberByStatusResponseData[]>([])
const orderListForShipped = ref<GetOrderSerialNumberByStatusResponseData[]>([])
const orderListForCompleted = ref<GetOrderSerialNumberByStatusResponseData[]>([])

async function fetchBoughtItemsInPrepared() {
  orderListForPrepared.value = (await getOrderSerialNumberByStatus({ userId: userId.value, status: 'prepared' })).data
  orderListForPrepared.value.sort((a, b) => +b.purchaseTime - +a.purchaseTime)
}

async function fetchBoughtItemsInShipped() {
  orderListForShipped.value = (await getOrderSerialNumberByStatus({ userId: userId.value, status: 'shipped' })).data
  orderListForShipped.value.sort((a, b) => +b.purchaseTime - +a.purchaseTime)
}

async function fetchBoughtItemsInCompleted() {
  orderListForCompleted.value = (await getOrderSerialNumberByStatus({ userId: userId.value, status: 'completed' })).data
  orderListForCompleted.value.sort((a, b) => +b.purchaseTime - +a.purchaseTime)
}

onMounted(() => {
  fetchBoughtItemsInPrepared()
  fetchBoughtItemsInShipped()
  fetchBoughtItemsInCompleted()
})

const isOpenDialog = ref(false)
const currentOrder = ref<GetOrderSerialNumberByStatusResponseData>()
function openDialog(order: GetOrderSerialNumberByStatusResponseData) {
  isOpenDialog.value = true
  currentOrder.value = order
}
</script>

<template>
  <PUserLayout>
    <div v-if="isLoggedIn" class="purchase-list-container">
      <div class="order-prepared-block block">
        <div class="subtitle">
          訂單準備中
        </div>
        <div v-if="orderListForPrepared.length > 0" class="order-content">
          <div class="item-titles">
            <div class="item-time">
              購買日期
            </div>
            <div class="item-orderid">
              訂單編號
            </div>
            <div class="item-payment-status">
              付款狀態
            </div>
            <div class="item-total-price">
              總計
            </div>
          </div>
          <div v-for="(item, i) in orderListForPrepared" :key="`prepared-${i + 1}`" class="item" @click="openDialog(item)">
            <div class="item-time">
              {{ `${new Date(+item.purchaseTime).getFullYear()}/${new Date(+item.purchaseTime).getMonth() + 1}/${new Date(+item.purchaseTime).getDate()}` }}
            </div>
            <div class="item-orderid">
              {{ item.serialNumber }}
            </div>
            <div class="item-payment-status">
              {{ item.paymentStatus === 'paid' ? '已付款' : '未付款' }}
            </div>
            <div class="item-total-price">
              {{ item.totalPrice }}
            </div>
          </div>
        </div>
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
  <OrderDialog v-if="isOpenDialog && currentOrder" :order="currentOrder" @close-dialog="isOpenDialog = false" />
</template>

<style lang="scss" scoped>
  .purchase-list-container {

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

      .item-titles {
        display: flex;
        align-items: center;
        gap: 1%;

      }
      .item {
        display: flex;
        width: 100%;
        padding: 0.8rem 0 0.5rem 0;
        gap: 1%;
        cursor: pointer;
        border-bottom: 0.1rem dashed var(--main-color);
        transition: all 0.2s ease-in-out;

        &:hover {
          opacity: 0.8;
          color: var(--main-product-color);
        }
      }

      .item-time {
        width: 25%;
        min-width: 5rem;
      }

      .item-orderid {
        width: 35%;
      }

      .item-payment-status {
        width: 23%;
      }

      .item-total-price {
        width: 14%;
      }
    }
  }

  @media screen and (min-width: 577px) {
    .purchase-list-container {
      padding: 2rem;
    }
  }

  @media screen and (max-width: 576px) {
    .purchase-list-container {
      padding: 1rem;
    }
  }
</style>
