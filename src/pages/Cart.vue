<script lang="ts" setup>
import { getPublicImgSrc } from '../utils/index'
import type { productInCart } from '@/types/index'
import { useProductsStore } from '@/stores/product'
import PButton from '@/components/PButton.vue'
import IconShoppingBasketLine from '~icons/ri/shopping-basket-line'
import IconCashRegister from '~icons/fa-solid/cash-register'

const { getProduct } = useProductsStore()

const productCartList: productInCart[] = [{
  id: 1,
  productId: 3,
  specification: null,
  amount: 4,
},
{
  id: 2,
  productId: 1,
  specification: 'spec-1',
  amount: 2,
}]

const numOfproductCart = computed(() => productCartList.length)
const total = computed(() => productCartList.reduce((acc, cur) => acc + cur.amount * (getProduct(cur.productId)?.price as number), 0))

const textInGoShoppingBtn = {
  text: '繼續購物',
  color: 'match-color',
  afterTextIcon: IconShoppingBasketLine,
}

const textInCheckoutBtn = {
  text: '訂單結帳',
  color: 'main-product-color',
  afterTextIcon: IconCashRegister,
}
</script>

<template>
  <div class="cart-container">
    <div class="cart-title">
      購物車
    </div>
    <div class="cart-bar">
      <div class="bar-all-product">
        <button><icon-material-symbols-check-box-outline-blank /></button>全部商品
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
      <div class="bar-else">
        刪除
      </div>
    </div>
    <div class="cart-content">
      <div v-for="product in productCartList" :key="`product-cart-${product.id}`" class="product">
        <div class="product-checkbox">
          <button><icon-material-symbols-check-box-outline-blank /></button>
        </div>
        <div class="product-name">
          <img class="product-img" :src="getPublicImgSrc(getProduct(product.id)?.images[0] as string)" alt="">
          {{ getProduct(product.id)?.name }}
        </div>
        <div class="product-spec product-else">
          {{ product.specification === null ? '無' : product.specification }}
        </div>
        <div class="product-price product-else">
          NT$ {{ getProduct(product.id)?.price }}
        </div>
        <div class="product-amount product-else">
          <input v-model="product.amount" type="number" min="1" max="100">
        </div>
        <div class="product-total product-else">
          NT$ {{ product.amount * (getProduct(product.id)?.price as number) }}
        </div>
        <div class="product-rwd">
          <img class="product-img" :src="getPublicImgSrc(getProduct(product.id)?.images[0] as string)" alt="">
          <div class="product-rwd-else">
            <div>{{ getProduct(product.id)?.name }}</div>
            <div>
              規格：{{ product.specification === null ? '無' : product.specification }}
            </div>
            <div>單價：NT$ {{ getProduct(product.id)?.price }}</div>
            <div>
              數量：<input v-model="product.amount" type="number" min="1" max="100">
            </div>
            <div class="product-total">
              小計：NT$ {{ product.amount * (getProduct(product.id)?.price as number) }}
            </div>
          </div>
        </div>
        <div class="product-delete">
          <button><icon-bi-cart-x /></button>
        </div>
      </div>
    </div>
    <div class="checkout-container">
      <div class="checkout-total">
        共 {{ numOfproductCart }} 件商品 | 總計 NT$ {{ total }}
      </div>
      <div class="checkout-btns">
        <RouterLink class="btn" to="/">
          <PButton :content="textInGoShoppingBtn" />
        </RouterLink>
        <PButton class="btn" :content="textInCheckoutBtn" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cart-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 4rem 0;

    .cart-title {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--text-color);
      width: 100%;
      display: flex;
      justify-content: start;
    }

    .cart-bar {
      display: flex;
      justify-content: space-between;
      background-color: var(--main-product-color);
      border-radius: 2rem;
      padding: 0.2rem 2rem;
      box-sizing: border-box;
      color: var(--white-color);
      font-weight: 400;
      margin: 1rem 0;

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

    .cart-content {
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
          width: 30%;
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

    .checkout-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      margin-top: 3rem;

      .checkout-total {
        font-weight: 500;
        letter-spacing: 1px;
        color: var(--text-color);
        margin-bottom: 1rem;
      }

      .checkout-btns {
        display: flex;
        gap: 1rem;
        width: 100%;

        .btn {
          text-decoration: none;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5%;
        }
      }

    }

  }

  @media screen and (max-width: 960px) {

    .cart-container {
      padding: 0 2rem;
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
          width: 50%;

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

    .btn {
      width: 30%;
    }
  }

  @media screen and (min-width: 547px) {

    .cart-container {
      padding: 0 2rem;

      .cart-bar {
        width: 100%;
      }
      .cart-content {
        padding: 0 1rem;
        .product {
          border: 1px solid var(--main-product-color);
        }
      }
    }
    .checkout-container {
      padding-right: 2rem;
      align-items: flex-end;

      .checkout-btns {
        justify-content: end;
      }
    }
  }

  @media screen and (max-width: 547px) {

    .cart-container {
      padding: 0;

      .cart-title {
        display: flex;
        justify-content: center;
      }

      .cart-bar {
        width: 90%;
      }
      .cart-content {
        padding: 0;

        .product {
          border-top: 1px solid var(--main-product-color);
          border-bottom: 1px solid var(--main-product-color);
        }
      }
    }

    .checkout-container {
      padding-right: 0;
      align-items: center;

      .checkout-btns {
        justify-content: center;

        .btn {
          width: 40%;
        }
      }

    }
  }
</style>