<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { getPublicImgSrc } from '../utils/index'
import PButton from '@/components/PButton.vue'
import IconShoppingBasketLine from '~icons/ri/shopping-basket-line'
import router from '@/router/index'
import IconCashRegister from '~icons/fa-solid/cash-register'
import { getProductListFromShoppingCartByUserId } from '@/api/cartItems/getProductListFromShoppingCartByUserId'
import type { GetProductListFromShoppingCartByUserIdResponseData } from '@/api/cartItems/getProductListFromShoppingCartByUserId'
import { getProduct } from '@/api/products/getProduct'
import { getProductImagesByProductId } from '@/api/productImages/getProductImagesByProductId'
import { getProductSpecificationsByProductId } from '@/api/productSpecifications/getProductSpecificationsByProductId'
import type { ProductInCart } from '@/types'
import { deleteProductFromCart } from '@/api/cartItems/deleteProductFromCart'
import { updateProductToShoppingCart } from '@/api/cartItems/updateProductToShoppingCart'
import { useCartUpdatedEventBus } from '@/composables/useCartUpdatedEventBus'

const { emit: emitCartUpdated } = useCartUpdatedEventBus()

const shoppingCartList = ref<GetProductListFromShoppingCartByUserIdResponseData[]>()
async function fetchCartItemsByUserId() {
  shoppingCartList.value = (await getProductListFromShoppingCartByUserId({ userId: 1 })).data
}

const cartProductList = ref<ProductInCart[]>([])
async function fetchCartProductList() {
  cartProductList.value = await Promise.all(
    (shoppingCartList.value ?? []).map(async (item) => {
      const product = (await getProduct({ id: item.productId })).data
      const productImage = (await getProductImagesByProductId({ productId: item.productId })).data
      const productSpec = (await getProductSpecificationsByProductId({ productId: item.productId })).data
      return {
        id: item.id,
        productId: item.productId,
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        name: product.name,
        image: productImage[0].image,
        price: product.price,
        amount: item.amount,
        specificationId: item.specificationId,
        specificationName: productSpec.find(spec => spec.id === item.specificationId)?.specName ?? '無',
      }
    }),
  )
}

onMounted(async () => {
  await fetchCartItemsByUserId()
  await fetchCartProductList()
})

const numOfproductCart = computed(() => cartProductList.value.reduce((acc, cur) => acc + cur.amount, 0))
const total = computed(() => cartProductList.value.reduce((acc, cur) => acc + cur.amount * cur.price, 0))

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

const checkedIdSet = ref(new Set<number>())

function checkeItem(id: number) {
  checkedIdSet.value.add(id)
}

function uncheckeItem(id: number) {
  checkedIdSet.value.delete(id)
}

function checkAllItems() {
  cartProductList.value.forEach((item) => {
    checkedIdSet.value.add(item.id)
  })
}

function uncheckAllItems() {
  checkedIdSet.value.clear()
}

async function handleDeleteCheckedItems() {
  await Promise.all(Array.from(checkedIdSet.value).map(id => deleteProductFromCart({ id })))
  checkedIdSet.value.clear()
  await fetchCartItemsByUserId()
  await fetchCartProductList()
  emitCartUpdated()
}

function handleCheckout() {
  router.push({ name: 'checkout' })
}

function handleClickProduct(productId: number, categoryId: number, subCategoryId: number) {
  router.push({
    name: 'product',
    params: {
      categoryId,
      subCategoryId,
      productId,
    },
  })
}

async function handleClickDelete(id: number) {
  await deleteProductFromCart({ id })
  await fetchCartItemsByUserId()
  await fetchCartProductList()
  emitCartUpdated()
}

async function updateCartItemAmount(id: number, amount: number) {
  await updateProductToShoppingCart({
    data: {
      id,
      amount,
    },
  })
  await fetchCartItemsByUserId()
  await fetchCartProductList()
  emitCartUpdated()
}
</script>

<template>
  <div class="cart-container">
    <div class="cart-title">
      購物車
      <button :disabled="checkedIdSet.size <= 0" class="all-delete-btn" @click="handleDeleteCheckedItems">
        全部刪除
      </button>
    </div>
    <div class="cart-bar">
      <div class="bar-all-product">
        <button v-if="checkedIdSet.size === cartProductList.length && cartProductList.length > 0" @click="uncheckAllItems">
          <icon-material-symbols-check-box-outline />
        </button>
        <button v-else @click="checkAllItems">
          <icon-material-symbols-check-box-outline-blank />
        </button>
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
      <div class="bar-else">
        刪除
      </div>
    </div>
    <div v-if="numOfproductCart !== 0" class="cart-content">
      <div v-for="product in cartProductList" :key="`product-cart-${product.id}`" class="product">
        <div class="product-checkbox">
          <button v-if="checkedIdSet.has(product.id)" @click="uncheckeItem(product.id)">
            <icon-material-symbols-check-box-outline />
          </button>
          <button v-else @click="checkeItem(product.id)">
            <icon-material-symbols-check-box-outline-blank />
          </button>
        </div>
        <div class="product-name" @click="handleClickProduct(product.productId, product.categoryId, product.subCategoryId)">
          <img class="product-img" :src="getPublicImgSrc(product.image)" alt="">
          {{ product.name }}
        </div>
        <div class="product-spec product-else">
          {{ product.specificationName }}
        </div>
        <div class="product-price product-else">
          NT$ {{ product.price }}
        </div>
        <div class="product-amount product-else">
          <input v-model="product.amount" type="number" min="1" max="10" @click="updateCartItemAmount(product.id, product.amount)">
        </div>
        <div class="product-total product-else">
          NT$ {{ product.amount * product.price }}
        </div>
        <div class="product-rwd">
          <img class="product-img" :src="getPublicImgSrc(product.image)" alt="" @click="handleClickProduct(product.productId, product.categoryId, product.subCategoryId)">
          <div class="product-rwd-else">
            <div>{{ product.name }}</div>
            <div>
              規格：{{ product.specificationName }}
            </div>
            <div>單價：NT$ {{ product.price }}</div>
            <div>
              數量：<input v-model="product.amount" type="number" min="1" max="10" @click="updateCartItemAmount(product.id, product.amount)">
            </div>
            <div class="product-total">
              小計：NT$ {{ product.amount * product.price }}
            </div>
          </div>
        </div>
        <div class="product-delete">
          <button @click="handleClickDelete(product.id)">
            <icon-bi-cart-x />
          </button>
        </div>
      </div>
    </div>
    <div v-else class="cart-no-content">
      目前還沒有商品喔！
    </div>
    <div class="checkout-container">
      <div class="checkout-total">
        共 {{ numOfproductCart }} 件商品 | 總計 NT$ {{ total }}
      </div>
      <div class="checkout-btns">
        <RouterLink
          class="btn" :to="{
            name: 'home',
          }"
        >
          <PButton :content="textInGoShoppingBtn" />
        </RouterLink>
        <PButton class="btn" :disabled="numOfproductCart === 0" :content="textInCheckoutBtn" @click="handleCheckout" />
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
      align-items: center;
      gap: 1rem;

      .all-delete-btn {
        padding: 0.3rem;
        background-color: var(--match-color);
        font-size: 1rem;
        color: var(--white-color);
        box-shadow: 1px 1px 1px 0px rgba($color: #000000, $alpha: 0.3);

        &:hover {
          opacity: 0.8;
        }

        &:disabled {
          opacity: 0.5;
          cursor: default;
        }
      }
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
          cursor: pointer;
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

    .cart-no-content {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: var(--text-color);
      font-weight: 500;
      padding: 1rem 0;
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
