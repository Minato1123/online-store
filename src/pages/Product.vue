<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import router from '@/router'
import type { BtnType, InfoType, Product, SlideType } from '@/types/index'
import { getPublicImgSrc } from '@/utils/index'
import PButton from '@/components/PButton.vue'
import ProductBox from '@/components/ProductBox.vue'
import InfoDialog from '@/components/InfoDialog.vue'
import Slide from '@/components/Slide.vue'

import { useProductsStore } from '@/stores/product'
import { useFollowedProductsStore } from '@/stores/followedProduct'
import { useCategoriesStore } from '@/stores/category'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import IconCartPlus from '~icons/bi/cart-plus'
import IconCartCheckFill from '~icons/bi/cart-check-fill'

const { getProductById } = useProductsStore()
const { products } = storeToRefs(useProductsStore())
const route = useRoute()
const productId = computed(() => route.params.productId)
const product = ref<Product | null>(null)

watch(productId, () => {
  const temp = getProductById(Number(productId.value))
  if (temp == null) {
    product.value = null
    return
  }
  product.value = temp
}, { immediate: true })

const { getCategoryById, getSubCategoryById } = useCategoriesStore()

const category = computed(() => {
  if (product.value == null)
    return null

  else
    return getCategoryById(product.value.categoryId) ?? null
})

const subCategory = computed(() => {
  if (product.value == null)
    return null

  else
    return getSubCategoryById(product.value.categoryId, product.value.subCategoryId) ?? null
})

const { addFollowedProduct, removeFollowedProduct, isInFollowedProducts } = useFollowedProductsStore()

function handleFollowedProducts() {
  if (product.value == null)
    throw new Error('product is null')

  if (isInFollowedProducts(product.value))
    removeFollowedProduct(product.value)
  else
    addFollowedProduct(product.value)
}

const activeImageIndex = ref(0)
const specPicked = ref(null)
const hasSpecifications = computed(() => {
  if (product.value == null)
    return false

  else
    return product.value.specifications.length > 0
})
const amountOfProduct = ref(1)

const showTab = ref<'image' | 'info'>('image')

const recommendProducts = computed<Product[]>(() => {
  const theProduct = product.value
  if (theProduct == null)
    return []
  else
    return products.value.filter(p => p.categoryId === theProduct.categoryId && p.subCategoryId === theProduct.subCategoryId && p.id !== theProduct.id)
})

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

const { addShoppingCart } = useShoppingCartStore()

function handleAddCart() {
  if (product.value == null)
    return

  const pId = product.value.id
  if (pId != null) {
    addShoppingCart(pId, specPicked.value, amountOfProduct.value)
    isOpenDialogAddCart.value = true
    window.setTimeout(() => {
      isOpenDialogAddCart.value = false
    }, 800)
  }
}

function handleCheckout() {
  if (product.value == null)
    return

  const pId = product.value.id
  if (pId != null) {
    addShoppingCart(pId, specPicked.value, amountOfProduct.value)
    router.push({ name: 'cart' })
  }
}

const slideImgs = computed(() => {
  if (product.value == null)
    return null

  else
    return product.value.images ?? null
})

const slidesConfig: SlideType = {
  slides: slideImgs.value ?? [],
  height: '100%',
  hasPage: false,
  hasTimeInterval: false,
  btnColor: 'black',
}
</script>

<template>
  <div v-if="product != null" class="product-container">
    <div class="breadcrumb">
      <RouterLink
        class="home-btn" :to="{
          name: 'home',
        }"
      >
        <icon-mdi-home-variant />
      </RouterLink>
      <span>/</span>{{ category?.name }}<span>/</span>{{ subCategory?.name }}
    </div>
    <div class="product-main-container">
      <div v-if="slidesConfig.slides != null" class="image-block">
        <Slide v-model:selectedPage="activeImageIndex" :slides-config="slidesConfig" />
        <div class="product-images-list">
          <label
            v-for="(image, i) in product.images" :key="`image-${i}`" :class="{
              active: activeImageIndex === i,
            }" class="product-image-radio"
          >
            <input
              v-model="activeImageIndex" class="hidden" type="radio" name="product-image" :value="i"
            >
            <img class="product-image" :src="getPublicImgSrc(image)">
          </label>
        </div>
      </div>
      <div class="content-block">
        <div class="title">
          {{ product.name }}
        </div>
        <div class="description">
          <div v-for="(decsLine, i) in product.description" :key="`decs-${i}`">
            {{ decsLine }}
          </div>
        </div>
        <div class="follow-price">
          <button @click="handleFollowedProducts">
            <icon-icon-park-solid-like v-if="isInFollowedProducts(product)" /><icon-icon-park-outline-like v-else />
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
              <label v-for="(spec, i) in product.specifications" :key="`spec-${i}`" class="spec-label" :class="{ 'spec-active': specPicked === i }">
                <input
                  v-model="specPicked" class="spec-radio hidden"
                  type="radio" name="specifications"
                  :value="i"
                >
                {{ spec }}
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
        <img v-for="(img, i) in product.images" :key="`main-image-${i}`" :src="getPublicImgSrc(img)" alt="">
      </div>
      <div v-if="showTab === 'info'" class="info-detail">
        <div v-if="product.details.size != null" class="info-line">
          <div class="info-subtitle">
            商品尺寸
          </div>
          <div class="info-content">
            {{ product.details.size }}
          </div>
        </div>
        <div v-if="product.details.wrapSize != null" class="info-line">
          <div class="info-subtitle">
            包裝尺寸
          </div>
          <div class="info-content">
            {{ product.details.wrapSize }}
          </div>
        </div>
        <div v-if="product.details.origin != null" class="info-line">
          <div class="info-subtitle">
            產地
          </div>
          <div class="info-content">
            {{ product.details.origin }}
          </div>
        </div>
        <div v-if="product.details.material != null" class="info-line">
          <div class="info-subtitle">
            材質
          </div>
          <div class="info-content">
            {{ product.details.material }}
          </div>
        </div>
        <div v-if="product.details.content != null" class="info-line">
          <div class="info-subtitle">
            內容物
          </div>
          <div class="info-content">
            {{ product.details.content }}
          </div>
        </div>
        <div v-if="product.details.weight != null" class="info-line">
          <div class="info-subtitle">
            重量
          </div>
          <div class="info-content">
            {{ product.details.weight }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="recommendProducts.length > 0" class="else-products">
      <div class="else-title">
        推薦商品
      </div>
      <div class="products">
        <ProductBox v-for="(p, i) in recommendProducts" :key="`recommend-product-${i}`" :product="p" />
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

      .home-btn {
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
