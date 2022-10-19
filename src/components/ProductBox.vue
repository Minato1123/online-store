<script setup lang="ts">
import ProductDialog from './ProductDialog.vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const isOpenProductQuickPage = ref(false)
</script>

<template>
  <div
    class="product-container"
    :class="$attrs.class"
  >
    <img :src="product.images[0]" alt="product's image">
    <div>
      <div class="product-info">
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-other">
          <div class="btns">
            <icon-bi-cart-plus />
            <icon-icon-park-outline-like />
          </div>
        </div>
      </div>
      <div class="price">
        NT$ {{ product.price }}
      </div>
    </div>
  </div>
  <ProductDialog v-if="isOpenProductQuickPage" :product="product" />
</template>

<style scoped lang="scss">
  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 32%;
    max-height: 19rem;
    background-color: var(--white-color);
    border: 1px solid var(--match-color);
    overflow: hidden;

    &:hover {
      scale: 1.02;
      transition: 0.2s;
      box-shadow: 1px 1px 1px 0px rgba(100, 100, 100, 0.2);
      cursor: pointer;
    }

    img {
      height: 70%;
      min-height: 10rem;
      width: auto;
    }

    .product-info {
      flex-grow: 1;
      display: flex;
      margin: auto;
      width: 90%;
      padding: 0.5rem 0;

      .product-name {
        color: var(--text-color);
        width: 60%;
      }

      .product-other {
        color: var(--main-product-color);
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .btns {
          display: flex;
          justify-content: end;
          gap: 10%;
          width: 100%;
          font-size: 1.5rem;
        }

      }
    }

    .price {
      display: flex;
      justify-content: end;
      padding-right: 1rem;
      padding-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--main-product-color);
    }
  }

  @media screen and (min-width: 1160px) {
    .product-container {
      width: 32%;

    }
  }

  @media screen and (max-width: 785px) {
  // product 換成兩個一組
    .product-container {
        width: 48%;

      }
  }

  @media screen and (max-width: 500px) {
    // product 換成一個一組
    .product-container {
      width: 100%;

    }
  }
</style>