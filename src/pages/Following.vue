<script setup lang="ts">
import ProductBox from '@/components/ProductBox.vue'
import { useFollowedProductsStore } from '@/stores/followedProduct'

const { followedProducts } = storeToRefs(useFollowedProductsStore())
</script>

<template>
  <div class="follow-container">
    <div class="follow-bar">
      追蹤清單
    </div>
    <div class="follow-products">
      <ProductBox v-for="(product, i) in followedProducts" :key="`follow-${i}`" class="follow-item" :product="product" />
    </div>
    <div v-if="followedProducts.length <= 0" class="empty-follow">
      目前追蹤清單還沒有商品喔！
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .follow-container {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 3rem 0;

    .follow-bar {
      width: 100%;
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
