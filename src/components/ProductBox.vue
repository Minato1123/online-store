<script setup lang="ts">
import type { PropType } from 'vue'
import ProductDialog from './ProductDialog.vue'
import type { Product } from '@/types/index'
import router from '@/router'
import { getPublicImgSrc } from '@/utils/index'
import { getProductImagesByProductId } from '@/api/productImages/getProductImagesByProductId'
import type { GetProductImagesByProductIdResponseData } from '@/api/productImages/getProductImagesByProductId'
import { getProductListFromFollowingByUserId, type getProductListFromFollowingByUserIdResponseData } from '@/api/followItems/getProductListFromFollowingByUserId'
import { addProductToFollowing } from '@/api/followItems/addProductToFollowing'
import { deleteProductFromFollowing } from '@/api/followItems/deleteProductFromFollowing'
import { useUsersStore } from '@/stores/user'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const { userId, isLoggedIn } = storeToRefs(useUsersStore())

const productImages = ref<GetProductImagesByProductIdResponseData[]>([])
const followProductList = ref<getProductListFromFollowingByUserIdResponseData[]>([])

async function fetchProductImages() {
  productImages.value = (await getProductImagesByProductId({ productId: props.product.id })).data
}

async function fetchFollowProductList() {
  if (isLoggedIn.value)
    followProductList.value = (await getProductListFromFollowingByUserId({ userId: userId.value })).data

  else
    followProductList.value = []
}

watch(props, async () => {
  await fetchProductImages()
  fetchFollowProductList()
})

onMounted(() => {
  fetchProductImages()
  fetchFollowProductList()
})

const followingList = computed(() => {
  return new Set(followProductList.value.map(item => item.productId))
})

async function handleFollowedProducts() {
  if (isLoggedIn.value === false)
    return
  const p = props.product
  if (p == null)
    return

  if (followingList.value.has(p.id)) {
    const followItem = followProductList.value.find(item => item.productId === p.id)
    if (followItem != null)
      await deleteProductFromFollowing({ id: followItem.id })
  }
  else {
    await addProductToFollowing({ data: { productId: p.id, userId: userId.value } })
  }
  fetchFollowProductList()
}

const isOpenProductQuickPage = ref(false)

function handleClickProductBox(categoryId: number, subCategoryId: number, productId: number) {
  router.push({
    name: 'product',
    params: {
      categoryId,
      subCategoryId,
      productId,
    },
  })
}
</script>

<template>
  <div
    class="product-container"
    :class="$attrs.class"
    @click="handleClickProductBox(product.categoryId, product.subCategoryId, product.id)"
  >
    <img v-if="productImages[0] != null" :src="getPublicImgSrc(productImages[0].image)" alt="product's image">
    <div class="product-content">
      <div class="product-info">
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-other">
          <div class="btns">
            <button @click.stop="isOpenProductQuickPage = true">
              <icon-bi-cart-plus />
            </button>
            <button @click.stop="handleFollowedProducts">
              <icon-icon-park-solid-like v-if="followingList.has(product.id)" /><icon-icon-park-outline-like v-else />
            </button>
          </div>
        </div>
      </div>
      <div class="price">
        NT$ {{ product.price }}
      </div>
    </div>
  </div>
  <ProductDialog v-if="isOpenProductQuickPage" :product="product" @close-product-quick-page="isOpenProductQuickPage = false" />
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
      height: 60%;
      min-height: 10rem;
      width: auto;
    }

    .product-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 40%;
      min-height: 5rem;
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
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.5rem;

        .btns {
          display: flex;
          justify-content: end;
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

  button {
    outline: none;
    background: transparent;
    border: none;
    color: var(--main-product-color);
    cursor: pointer;

    &:hover {
      color: var(--match-color);
    }
  }

  @media screen and (min-width: 1160px) {
    .product-container {
      width: 32%;

    }
  }

  @media screen and (min-width: 785px) {
    .btns {
        gap: 10%;
    }
  }

  @media screen and (max-width: 785px) {
  // product 換成兩個一組
    .product-container {
        width: 48%;

      }
    .btns {
        gap: 0;
    }
  }

  @media screen and (max-width: 500px) {
    // product 換成一個一組
    .product-container {
      width: 100%;

    }
  }
</style>
