<script lang="ts" setup>
import { getPublicImgSrc } from '../utils/index'
import type { ProductBought } from '@/types/index'
import { useProductsStore } from '@/stores/product'

const props = defineProps({
  target: {
    type: String,
    require: true,
  },
})

const { getProduct } = useProductsStore()

const productBuyingList: ProductBought[] = [{
  id: 1,
  productId: 3,
  name: '帕恰狗 15mm 紙膠帶（悠閒生活）',
  image: '/images/products/product-3-1.jpeg',
  specification: null,
  amount: 2,
  price: 95,
  status: 'prepared',
}, {
  id: 2,
  productId: 5,
  name: '帕恰狗鉛筆風原子筆組（永遠在一起）',
  image: '/images/products/product-5-1.jpeg',
  specification: null,
  amount: 4,
  price: 280,
  status: 'prepared',
}]

const numOfproductCart = computed(() => productBuyingList.reduce((acc, cur) => acc + cur.amount, 0))
const total = computed(() => productBuyingList.reduce((acc, cur) => acc + cur.amount * (getProduct(cur.productId)?.price as number), 0))
</script>

<template>
  <div class="checkout-container">
    <div class="checkout-progression">
      <div
        class="check-data check-item" :class="{
          active: props.target === 'checkout',
        }"
      >
        <div>1</div>
        <div><icon-ic-twotone-edit-note /></div>
        <div>填寫資料</div>
      </div>
      <div class="check-line" />
      <div
        class="check-delivery check-item" :class="{
          active: props.target === 'delivery',
        }"
      >
        <div>2</div>
        <div><icon-tabler-truck-delivery /></div>
        <div>付款與送貨方式</div>
      </div>
      <div class="check-line" />
      <div
        class="check-data check-item" :class="{
          active: props.target === 'completed',
        }"
      >
        <div>3</div>
        <div><icon-pepicons-clipboard-check /></div>
        <div>訂單完成</div>
      </div>
    </div>
    <div class="product-bar">
      <div class="bar-all-product">
        全部商品
      </div>
      <div class="bar-else">
        規格
      </div>
      <div class="bar-else">
        單價
      </div>
      <div class="bar-else">
        數量
      </div>
      <div class="bar-else">
        小計
      </div>
    </div>
    <div class="product-content">
      <div v-for="product in productBuyingList" :key="`product-cart-${product.id}`" class="product">
        <div class="product-name">
          <img class="product-img" :src="getPublicImgSrc(getProduct(product.productId)?.images[0] as string)" alt="">
          {{ getProduct(product.id)?.name }}
        </div>
        <div class="product-spec product-else">
          {{ product.specification === null ? '無' : product.specification }}
        </div>
        <div class="product-price product-else">
          NT$ {{ getProduct(product.productId)?.price }}
        </div>
        <div class="product-amount product-else">
          {{ product.amount }}
        </div>
        <div class="product-total product-else">
          NT$ {{ product.amount * (getProduct(product.productId)?.price as number) }}
        </div>
        <div class="product-rwd">
          <img class="product-img" :src="getPublicImgSrc(getProduct(product.productId)?.images[0] as string)" alt="">
          <div class="product-rwd-else">
            <div>{{ getProduct(product.productId)?.name }}</div>
            <div>
              規格：{{ product.specification === null ? '無' : product.specification }}
            </div>
            <div>單價：NT$ {{ getProduct(product.productId)?.price }}</div>
            <div>
              數量：{{ product.amount }}
            </div>
            <div class="product-total">
              小計：NT$ {{ product.amount * (getProduct(product.productId)?.price as number) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.checkout-container {
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  overflow-x: hidden;

  .checkout-progression {
    display: flex;
    justify-content: center;

    .check-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      color: var(--main-color);
      font-size: 1.1rem;
      font-weight: 600;

      &.active {
        color: var(--main-product-color);
      }

      .svg-icon {
        width: 2rem;
        height: 2rem;
      }
    }

    .check-line {
      width: 5%;
      height: 0.1rem;
      background-color: var(--main-color);
      margin-top: 2.5rem;
    }
  }

  .product-bar {
      display: flex;
      justify-content: space-between;
      background-color: var(--main-product-color);
      border-radius: 2rem;
      padding: 0.2rem 2rem;
      box-sizing: border-box;
      color: var(--white-color);
      font-weight: 400;
      margin: 2rem 0 1rem 0;

      .bar-all-product {
        width: 35%;
        display: flex;
        justify-content: start;
        align-items: center;

        .svg-icon {
          color: var(--white-color);
        }
      }

      .bar-else {
        width: 13%;
        justify-content: center;
        align-items: center;
      }
    }

    .product-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      box-sizing: border-box;

      .product {
        display : flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--white-color);
        padding: 0.5rem 1rem;
        box-sizing: border-box;

        .product-checkbox {
          width: 5%;

          .svg-icon {
            color: var(--main-product-color);
          }
        }

        .product-name {
          width: 35%;
          justify-content: center;
          align-items: center;
          color: var(--text-color);

        }

        .product-else {
          justify-content: center;
          align-items: center;
          width: 13%;
          color: var(--text-color);

          &.product-amount {
            justify-content: center;
            align-items: center;

            input {
              width: 80%;
              outline: none;
              border: 1px solid var(--main-product-color);
              height: 60%;
              text-align: center;
              font-size: 0.8rem;
              font-weight: 300;
            }
          }

          &.product-total {
            color: var(--main-product-color);
            font-weight: 500;
          }

        }

        .product-delete {
          display: flex;
          justify-content: center;
          width: 13%;

            .svg-icon {
              color: var(--text-color);
              width: 1.5rem;
              height: 1.5rem;
            }
          }
      }
    }
}

@media screen and (min-width: 836px) {

.product-img {
  width: 40%;
}

.product-name, .product-else {
  display: flex;
}

.product-amount {
  display: flex;

}
.product-rwd {
  display: none;
}
.bar-else {
  display: flex;
}

.btn {
  width: 18%;
}
}

@media screen and (max-width: 835px) {

.product-name, .product-else {
  display: none;
}

.product-amount {
  display: none;
}
.product-rwd {
  display: flex;
  justify-content: center;
  align-items: center;

    .product-img {
      width: 40%;
    }

    .product-rwd-else {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      gap: 0.5rem;
      color: var(--text-color);
      width: 60%;
      padding-left: 1rem;

      input {
        text-align: center;
      }

      .product-total {
        color: var(--main-product-color);
        font-weight: 500;
      }
    }
}
.bar-else {
  display: none;
}
}

@media screen and (min-width: 547px) {

.checkout-container {
  padding: 0 2rem;

  .product-bar {
    width: 100%;
  }
  .product-content {
    padding: 0 1rem;
    .product {
      border: 1px solid var(--main-product-color);
    }
  }
}
}

@media screen and (max-width: 547px) {

  .checkout-container {
    padding: 0;

    .product-bar {
      width: 90%;
      margin: 2rem auto;
    }
    .product-content {
      padding: 0;

      .product {
        border-top: 1px solid var(--main-product-color);
        border-bottom: 1px solid var(--main-product-color);
      }
    }
  }
}
</style>
