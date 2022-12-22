<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'
import type { ProductBought } from '@/types/index'
import { useProductsStore } from '@/stores/product'
import { useProductBoughtListStore } from '@/stores/productBought'

const { getProduct } = useProductsStore()
const { productBoughtList } = storeToRefs(useProductBoughtListStore())
const orderListPrepared = computed(() => {
  return productBoughtList.value.filter((item: ProductBought) => item.status === 'prepared')
})
const orderListShipped = computed(() => {
  return productBoughtList.value.filter((item: ProductBought) => item.status === 'shipped')
})
const orderListCompleted = computed(() => {
  return productBoughtList.value.filter((item: ProductBought) => item.status === 'completed')
})
</script>

<template>
  <PUserLayout>
    <div class="purchase-list-container">
      <div class="order-prepared-block block">
        <div class="subtitle">
          訂單準備中
        </div>
        <div class="order-content">
          <div v-for="(item, i) in orderListPrepared" :key="`prepared-${i + 1}`" class="item">
            <div>{{ i + 1 }}</div>
            <div>{{ getProduct(item.productId)?.name }}</div>
            <div>{{ item.specification }}</div>
            <div>{{ item.amount }}</div>
            <div>{{ (getProduct(item.productId)?.price || 0) * item.amount }}</div>
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
</template>

<style lang="scss" scoped>
  .purchase-list-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;

    .block {
      width: 100%;
      min-height: 6rem;
    }
    .subtitle {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 1rem 0;
      color: var(--text-color)
    }
    .order-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0.5rem 0;
      }
    }
  }
</style>
