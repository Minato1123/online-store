<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import router from '@/router'
import type { BtnType, InfoType, SlideType } from '@/types/index'
import { getPublicImgSrc } from '@/utils/index'
import ProductBox from '@/components/ProductBox.vue'
import PButton from '@/components/PButton.vue'
import InfoDialog from '@/components/InfoDialog.vue'
import Slide from '@/components/Slide.vue'

import { useCartStore } from '@/stores/shoppingCart'
import IconCartPlus from '~icons/bi/cart-plus'
import IconCartCheckFill from '~icons/bi/cart-check-fill'
import { useUsersStore } from '@/stores/user'

import { getProduct } from '@/api/products/getProduct'
import type { GetProductResponseData } from '@/api/products/getProduct'
import { getProductSpecificationsByProductId } from '@/api/productSpecifications/getProductSpecificationsByProductId'
import type { GetProductSpecificationsByProductIdResponseData } from '@/api/productSpecifications/getProductSpecificationsByProductId'
import { getProductImagesByProductId } from '@/api/productImages/getProductImagesByProductId'
import type { GetProductImagesByProductIdResponseData } from '@/api/productImages/getProductImagesByProductId'
import { getProductDescriptionByProductId } from '@/api/productDescription/getProductDescriptionByProductId'
import type { GetProductDescriptionByProductIdResponseData } from '@/api/productDescription/getProductDescriptionByProductId'
import { getCategory } from '@/api/categories/getCategory'
import type { GetCategoryResponseData } from '@/api/categories/getCategory'
import { getSubCategory } from '@/api/subCategories/getSubCategory'
import type { GetSubCategoryResponseData } from '@/api/subCategories/getSubCategory'
import { getRecommendProductList } from '@/api/products/getRecommendProductList'
import { getProductListFromFollowingByUserId } from '@/api/followItems/getProductListFromFollowingByUserId'
import type { GetProductListFromFollowingByUserIdResponseData } from '@/api/followItems/getProductListFromFollowingByUserId'
import { addProductToFollowing } from '@/api/followItems/addProductToFollowing'
import { deleteProductFromFollowing } from '@/api/followItems/deleteProductFromFollowing'
import { addProductToShoppingCart } from '@/api/cartItems/addProductToShoppingCart'
import { useCartUpdatedEventBus } from '@/composables/useCartUpdatedEventBus'

const route = useRoute()
const productId = computed(() => route.params.productId)
const product = ref<GetProductResponseData | null>(null)
const productSpec = ref<GetProductSpecificationsByProductIdResponseData[]>([])
const productImages = ref<GetProductImagesByProductIdResponseData[]>([])
const productDescription = ref<GetProductDescriptionByProductIdResponseData[]>([])
const category = ref<GetCategoryResponseData | null>(null)
const subCategory = ref<GetSubCategoryResponseData | null>(null)
const recommendProductList = ref<GetProductResponseData[]>([])
const followProductList = ref<GetProductListFromFollowingByUserIdResponseData[]>([])

const { userId, isLoggedIn } = storeToRefs(useUsersStore())
const { addLocalCart } = useCartStore()
const { emit: emitCartUpdated } = useCartUpdatedEventBus()

async function fetchProduct() {
  product.value = (await getProduct({ id: Number(productId.value) })).data
}

async function fetchProductSpec() {
  productSpec.value = (await getProductSpecificationsByProductId({ productId: Number(productId.value) })).data
}

async function fetchProductImages() {
  productImages.value = (await getProductImagesByProductId({ productId: Number(productId.value) })).data
}

async function fetchProductDescription() {
  productDescription.value = (await getProductDescriptionByProductId({ productId: Number(productId.value) })).data
}

async function fetchCategory() {
  if (product.value == null)
    return
  category.value = (await getCategory({ id: Number(product.value.categoryId) })).data
}

async function fetchSubCategory() {
  if (product.value == null)
    return
  subCategory.value = (await getSubCategory({ id: Number(product.value.subCategoryId) })).data
}

async function fetchRecommendProductList() {
  if (product.value == null)
    return
  recommendProductList.value = (await getRecommendProductList({ productId: product.value.id, subCategoryId: Number(product.value.subCategoryId) })).data
}

async function fetchFollowProductList() {
  if (isLoggedIn.value)
    followProductList.value = (await getProductListFromFollowingByUserId({ userId: userId.value })).data
  else
    followProductList.value = []
}

watch(productId, async () => {
  await fetchProduct()
  fetchProductSpec()
  fetchProductImages()
  fetchProductDescription()
  fetchCategory()
  fetchSubCategory()
  fetchRecommendProductList()
  fetchFollowProductList()
})

onMounted(async () => {
  await fetchProduct()
  fetchProductSpec()
  fetchProductImages()
  fetchProductDescription()
  fetchCategory()
  fetchSubCategory()
  fetchRecommendProductList()
  fetchFollowProductList()
})

const followingList = computed(() => {
  return new Set(followProductList.value.map(item => item.productId))
})

async function handleFollowedProducts() {
  if (isLoggedIn.value === false)
    return
  const p = product.value
  if (p == null)
    return

  if (followingList.value.has(p.id)) {
    const followItem = followProductList.value.find(item => item.productId === p.id)
    if (followItem != null)
      await deleteProductFromFollowing({ id: followItem.id })
  }
  else {
    await addProductToFollowing({ productId: p.id, userId: userId.value })
  }
  fetchFollowProductList()
}

const activeImageIndex = ref(0)
const specPicked = ref(null)
const hasSpecifications = computed(() => {
  if (product.value == null)
    return false

  else
    return productSpec.value.length > 0
})
const amountOfProduct = ref(1)

const showTab = ref<'image' | 'info'>('image')

const textInBtnToAddCart: BtnType = {
  text: '加入購物車',
  color: 'match-color',
  beforeTextIcon: IconCartPlus,
}

const textInBtnCheckout: BtnType = {
  text: '直接購買',
  color: 'main-product-color',
}

const textInDialogAddCart: InfoType = {
  iconBeforeText: IconCartCheckFill,
  text: '已加入購物車',
  color: 'main-color',
  borderColor: 'main-color',
}
const isOpenDialogAddCart = ref(false)

async function handleAddCart() {
  const theProduct = product.value
  if (theProduct == null)
    return

  if (isLoggedIn.value) {
    await addProductToShoppingCart({
      userId: userId.value,
      productId: theProduct.id,
      specificationId: specPicked.value,
      amount: amountOfProduct.value,
    })
  }
  else {
    addLocalCart(theProduct.id, specPicked.value, amountOfProduct.value)
  }

  emitCartUpdated()
  isOpenDialogAddCart.value = true
  window.setTimeout(() => {
    isOpenDialogAddCart.value = false
  }, 800)
}

function handleCheckout() {
  if (product.value == null)
    return

  const pId = product.value.id
  if (pId != null) {
    addLocalCart(pId, specPicked.value, amountOfProduct.value)
    router.push({ name: 'cart' })
  }
}

const slideImgs = computed(() => {
  if (product.value == null)
    return null

  else
    return productImages.value.map(img => img.image) ?? null
})

const slidesConfig = computed<SlideType>(() => {
  return {
    slides: slideImgs.value ?? [],
    height: '100%',
    hasPage: false,
    hasTimeInterval: false,
    btnColor: 'black',
  }
})
</script>

<template>
  <div v-if="product != null" class="product-container">
    <div class="breadcrumb">
      <RouterLink
        class="link-btn" :to="{
          name: 'home',
        }"
      >
        <icon-mdi-home-variant />
      </RouterLink>
      <span>/</span><RouterLink
        v-if="category != null"
        class="link-btn"
        :to="{
          name: 'categories',
          params: {
            categoryId: category.id,
          },
        }"
      >
        {{ category.name }}
      </RouterLink><span>/</span><RouterLink
        v-if="subCategory != null && category != null"
        class="link-btn"
        :to="{
          name: 'subCategories',
          params: {
            categoryId: category.id,
            subCategoryId: subCategory.id,
          },
        }"
      >
        {{ subCategory.name }}
      </RouterLink>
    </div>
    <div class="product-main-container">
      <div v-if="slidesConfig.slides != null" class="image-block">
        <Slide v-model:selectedPage="activeImageIndex" :slides-config="slidesConfig" />
        <div class="product-images-list">
          <label
            v-for="(imgObj, i) in productImages" :key="`image-${i}`" :class="{
              active: activeImageIndex === i,
            }" class="product-image-radio"
          >
            <input
              v-model="activeImageIndex" class="hidden" type="radio" name="product-image" :value="i"
            >
            <img class="product-image" :src="getPublicImgSrc(imgObj.image)">
          </label>
        </div>
      </div>
      <div class="content-block">
        <div class="title">
          {{ product.name }}
        </div>
        <div class="description">
          <div v-for="(decsLineObj, i) in productDescription" :key="`decs-${i}`">
            {{ decsLineObj.description }}
          </div>
        </div>
        <div class="follow-price">
          <button @click="handleFollowedProducts">
            <icon-icon-park-solid-like v-if="followingList.has(product.id)" /><icon-icon-park-outline-like v-else />
          </button>
          <div class="price">
            NT$ {{ product.price }}
          </div>
        </div>
        <div class="spec-amount">
          <div class="spec-block">
            <div class="subtitle">
              規格
            </div>
            <div class="spec-subblock">
              <label v-for="(spec, i) in productSpec" :key="`spec-${i}`" class="spec-label" :class="{ 'spec-active': specPicked === i }">
                <input
                  v-model="specPicked" class="spec-radio hidden"
                  type="radio" name="specifications"
                  :value="i"
                >
                {{ spec.specName }}
              </label>
              <label v-if="!hasSpecifications" class="spec-label spec-active">
                <input
                  v-model="specPicked" class="spec-radio hidden"
                  type="radio" name="specifications"
                  value="null" disabled
                >
                無
              </label>
            </div>
          </div>
          <div class="amount-block">
            <div class="subtitle">
              數量
            </div>
            <input v-model="amountOfProduct" name="amount" class="amount-product" type="number" min="1" max="10">
          </div>
        </div>
        <div class="buy-btns">
          <PButton class="btn" :content="textInBtnToAddCart" @click="handleAddCart" />
          <PButton class="btn" :content="textInBtnCheckout" @click="handleCheckout" />
        </div>
        <div class="postscript">
          付款後，從備貨到寄出商品為 2~4 個工作天（不包含假日），請耐心等候。
        </div>
      </div>
    </div>
    <ul class="activity-list">
      <li class="activity">
        <div class="activity-title activity-global">
          全館活動
        </div>
        <div class="activity-content ">
          <span>09/09-09/21</span><span>週年慶全館折扣</span>
        </div>
      </li>
      <li class="activity">
        <div class="activity-title">
          訂單加價購
        </div>
        <div class="activity-content">
          <span>09/07-10/02</span><span>滿800元可加購造型矽膠捲線夾(本區限購3個)</span>
        </div>
      </li>
      <li class="activity">
        <div class="activity-title">
          訂單加價購
        </div>
        <div class="activity-content">
          <span>09/09-10/02</span><span>購物滿3000，限時加贈三麗鷗明星親愛抱抱筆袋</span>
        </div>
      </li>
    </ul>
    <div class="product-info-container">
      <div class="info-title">
        <button
          :class="{
            active: showTab === 'image',
          }" @click="showTab = 'image'"
        >
          商品介紹
        </button>
        <button
          :class="{
            active: showTab === 'info',
          }" @click="showTab = 'info'"
        >
          規格說明
        </button>
      </div>
      <div class="line" />
      <div v-if="showTab === 'image'" class="info-images">
        <img v-for="(imgObj, i) in productImages" :key="`main-image-${i}`" :src="getPublicImgSrc(imgObj.image)" alt="">
      </div>
      <div v-if="showTab === 'info'" class="info-detail">
        <div v-if="product.size != null" class="info-line">
          <div class="info-subtitle">
            商品尺寸
          </div>
          <div class="info-content">
            {{ product.size }}
          </div>
        </div>
        <div v-if="product.wrapSize != null" class="info-line">
          <div class="info-subtitle">
            包裝尺寸
          </div>
          <div class="info-content">
            {{ product.wrapSize }}
          </div>
        </div>
        <div v-if="product.origin != null" class="info-line">
          <div class="info-subtitle">
            產地
          </div>
          <div class="info-content">
            {{ product.origin }}
          </div>
        </div>
        <div v-if="product.material != null" class="info-line">
          <div class="info-subtitle">
            材質
          </div>
          <div class="info-content">
            {{ product.material }}
          </div>
        </div>
        <div v-if="product.content != null" class="info-line">
          <div class="info-subtitle">
            內容物
          </div>
          <div class="info-content">
            {{ product.content }}
          </div>
        </div>
        <div v-if="product.weight != null" class="info-line">
          <div class="info-subtitle">
            重量
          </div>
          <div class="info-content">
            {{ product.weight }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="recommendProductList.length > 0" class="else-products">
      <div class="else-title">
        推薦商品
      </div>
      <div class="products">
        <ProductBox v-for="(rp, i) in recommendProductList" :key="`recommend-product-${i}`" :product="rp" />
      </div>
    </div>
  </div>
  <InfoDialog v-if="isOpenDialogAddCart" :text-in-dialog="textInDialogAddCart" />
</template>

<style lang="scss" scoped>
.hidden {
  width: 0.1px;
  height: 0.1px;
}

a {
  text-decoration: none;
}

  .product-container {
    width: 100%;
    margin: 2rem 10rem;

    .breadcrumb {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 0.5rem;
      color: var(--main-color);
      padding-left: 2rem;

      .link-btn {
        color: var(--main-color);
        display: flex;
      }
    }

    .product-main-container {
      margin-top: 0.5rem;
      background-color: var(--white-color);

      display: flex;
      justify-content: space-between;
      box-sizing: border-box;

      .image-block {
        display: flex;
        flex-direction: column;

        .main-image {
          width: 100%;
          margin-bottom: 1rem;
        }

        .product-images-list {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;

          label {
            width: 4rem;
            height: 4rem;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.02rem solid var(--main-color);
            position: relative;
            transition: all 0.2s ease-in-out;

            &.active {
              border: 0.02rem solid var(--main-product-color);

              &::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 0.1rem;
                bottom: 0rem;
                background-color: var(--main-product-color);
              }
            }

            .product-image {
              height: 100%;
              padding: 0.1rem;
              box-sizing: border-box;
            }
          }
        }
      }

      .content-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          color: var(--text-color);
          font-size: 1.4rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .description {
          color: var(--main-color);
          font-weight: 300;
        }

        .follow-price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;

          button {
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;

            .svg-icon {
              width: 2rem;
              height: 2rem;
              color: var(--main-product-color);
            }
          }

          .price {
            color: var(--main-product-color);
            font-size: 1.4rem;
            font-weight: 500;
          }
        }

        .spec-amount {
          display: flex;
          justify-content: space-around;
          align-items: center;

          .spec-block, .amount-block {
            display: flex;
            flex-direction: column;
            width: 40%;
            gap: 1rem;

            .subtitle {
              color: var(--text-color);
              font-size: 1.2rem;
              font-weight: 500;
            }

            .spec-subblock {
              display: flex;
              width: 100%;
              justify-content: start;
              align-items: center;
              gap: 0.5rem;

              .spec-label {
                display: flex;
                width: 6rem;
                justify-content: center;
                align-items: center;
                border: 0.1rem solid var(--text-color);
                color: var(--text-color);
                border-radius: 0.3rem;
                padding: 0.2rem;
                cursor: pointer;
                transition: all 0.2s;

                &.spec-active {
                  background-color: var(--text-color);
                  color: var(--white-color);
                }

                &:hover {
                  background-color: var(--text-color);
                  color: var(--white-color);
                }
              }
            }

            .amount-product {
              width: 80%;
              height: 1.5rem;
              outline: none;
              border: 0.1rem solid var(--text-color);
              padding-left: 0.3rem;
            }
          }
        }

        .buy-btns {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 2rem;
        }

        .postscript {
          width: 100%;
          font-size: 0.8rem;
          color: var(--main-product-color);
          padding-top: 1rem;
          text-align: end;
        }
      }
    }

    .activity-list {

      .activity {
        display: flex;
        justify-content: start;
        gap: 1rem;
        margin: 1rem 0;

        .activity-title {
          border-radius: 0.3rem;
          color: var(--white-color);
          font-weight: 500;
          background-color: var(--match-color);
          width: 7rem;
          padding: 0.3rem 0;
          display: flex;
          justify-content: center;
          align-items: center;

          &.activity-global {
            background-color: var(--main-product-color);
          }
        }

        .activity-content {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          color: var(--text-color);
        }
      }

    }

    .product-info-container {
      display: flex;
      background-color: var(--white-color);
      padding: 1rem;

      .info-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1rem;

        button {
          outline: none;
          border: none;
          background: transparent;
          color: var(--main-product-color);
          font-size: 1.3rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.8rem 0;
          width: 100%;
          opacity: 0.6;
          transition: all 0.2s;

          &:hover {
            opacity: 1;
          }

          &.active {
            opacity: 1;
          }
        }
      }

      .line {
        width: 0.1rem;
        height: 12rem;
        margin: 0.8rem 0.5rem 0 0.5rem;
        background-color: var(--main-product-color);
      }

      .info-images {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        img {
          width: 60%;
        }
      }

      .info-detail {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;

        .info-line {
          display: flex;

          .info-subtitle {
            color: var(--text-color);
            font-size: 1.1rem;
            font-weight: 500;
          }
        }

      }
    }

    .else-products {
      margin: 2rem auto;
      overflow-x: auto;
      .else-title {
        padding: 0.5rem 1.6rem;
        border-radius: 2rem;
        background-color: var(--main-product-color);
        color: var(--white-color);
        font-size: 1.1rem;
        font-weight: 500;
      }

      .products {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  }

  @media screen and (min-width: 1251px) {
    .buy-btns {
      gap: 3rem;

      .btn {
        width: 30%;
      }
    }
  }

  @media screen and (max-width: 1250px) {

    .product-container {
      margin: 2rem 3rem;

      .buy-btns {
        gap: 1rem;

        .btn {
          width: 45%;
        }
      }
    }
  }

  @media screen and (min-width: 821px) {
    .product-main-container {
      padding: 2rem;

      .image-block {
        width: 40%;
      }

      .content-block {
        width: 60%;
        padding: 0 2rem 0 4rem;

      }

    }

    .activity {
      align-items: center;

      .activity-content {
        align-items: center;
      }
    }

    .info-title {
      padding: 0 1rem;
    }

    .info-detail {
      padding: 1rem 1rem 1rem 2rem;
    }

  }

  @media screen and (max-width: 820px) {

    .product-container {
      margin: 2rem 10rem;

      .product-main-container {
        flex-direction: column;
        padding: 1rem;

        .image-block {
          width: 100%;
          margin-bottom: 2rem;
        }

        .content-block {
          width: 100%;
          padding: 0;
        }

        .content-block {

          .title {
            margin-bottom: 1rem;
          }
        }
      }

      .activity-list {
        padding-right: 2.5rem;

        .activity {
          flex-direction: column;
          align-items: flex-start;

          .activity-content {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      }

      .product-info-container {
        flex-direction: column;

        .info-title {
          flex-direction: row;
          width: 100%;
          padding: 0 0 0.5rem 0;
          border-bottom: 0.1rem solid var(--main-product-color);

          button {
            width: 50%;
          }

        }

        .line {
          display: none;
        }

        .info-detail {
          padding: 1rem;
        }
      }

    }
  }

  @media screen and (min-width: 541px) {

    .product-container {

      .product-main-container {
        border: 0.1rem solid var(--main-product-color);
        border-radius: 2rem;
      }

      .product-info-container {
        border: 0.1rem solid var(--main-product-color);
        border-radius: 2rem;
      }

      .info-subtitle {
        width: 20%;
      }

      .info-content {
        width: 80%;
      }
    }
  }

  @media screen and (max-width: 540px) {

    .product-container {
      padding: 0;

      .product-main-container {
        width: 100%;
        border-top: 0.1rem solid var(--main-product-color);
        border-bottom: 0.1rem solid var(--main-product-color);
      }

      .product-info-container {
        border-top: 0.1rem solid var(--main-product-color);
        border-bottom: 0.1rem solid var(--main-product-color);
        .info-detail {

          .info-line {
            width: 100%;
            flex-direction: column;
            gap: 0.5rem;

            .info-subtitle, .info-content {
              width: 100%;
            }
          }
        }

        .info-images {
          padding-top: 1rem;
        }
      }

      .else-products {
        padding: 0 1rem;
      }
    }
  }
</style>
