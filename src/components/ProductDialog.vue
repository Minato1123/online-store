<script setup lang="ts">
import { type PropType, Teleport } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import type { InfoType, Product } from '../types/index'
import { getPublicImgSrc } from '../utils/index'
import { useCartStore } from '../stores/shoppingCart'
import PButton from './PButton.vue'
import { useUsersStore } from '@/stores/user'
import InfoDialog from '@/components/InfoDialog.vue'
import IconCartCheckFill from '~icons/bi/cart-check-fill'
import { getProductImagesByProductId } from '@/api/productImages/getProductImagesByProductId'
import type { GetProductImagesByProductIdResponseData } from '@/api/productImages/getProductImagesByProductId'
import { getProductSpecificationsByProductId } from '@/api/productSpecifications/getProductSpecificationsByProductId'
import type { GetProductSpecificationsByProductIdResponseData } from '@/api/productSpecifications/getProductSpecificationsByProductId'
import { addProductToShoppingCart } from '@/api/cartItems/addProductToShoppingCart'
import { useCartUpdatedEventBus } from '@/composables/useCartUpdatedEventBus'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const emit = defineEmits(['closeProductQuickPage'])

const { userId, isLoggedIn } = storeToRefs(useUsersStore())

const { emit: emitCartUpdated } = useCartUpdatedEventBus()

const productImages = ref<GetProductImagesByProductIdResponseData[]>([])
const productSpec = ref<GetProductSpecificationsByProductIdResponseData[]>([])

async function fetchProductImages() {
  productImages.value = (await getProductImagesByProductId({ productId: props.product.id })).data
}
async function fetchProductSpec() {
  productSpec.value = (await getProductSpecificationsByProductId({ productId: props.product.id })).data
}

watch(props, async () => {
  await fetchProductImages()
  await fetchProductSpec()
})

onMounted(() => {
  fetchProductImages()
  fetchProductSpec()
})

const { addLocalCart } = useCartStore()

const numOfProduct = ref(1)
const subtotal = computed(() => numOfProduct.value * props.product.price)
function closeProductQuickPage() {
  emit('closeProductQuickPage')
}

const specPicked = ref<null | number>(null)
if (productSpec.value.length > 0)
  specPicked.value = 0

const hasSpecifications = computed(() => productSpec.value.length > 0)

const textInBtnAddCart = {
  text: '加入購物車',
  color: 'main-product-color',
}

// 按 ESC 可以關閉快速購物車
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    closeProductQuickPage()
}, false)

const isOpenDialogAddCart = ref(false)
async function submitAddCart() {
  if (isLoggedIn.value) {
    await addProductToShoppingCart({
      userId: userId.value,
      productId: props.product.id,
      specificationId: specPicked.value,
      amount: numOfProduct.value,
    })
  }
  else {
    await addLocalCart(
      props.product.id,
      specPicked.value,
      numOfProduct.value,
    )
  }
  emitCartUpdated()
  isOpenDialogAddCart.value = true
  window.setTimeout(() => {
    isOpenDialogAddCart.value = false
  }, 800)
  window.setTimeout(() => {
    closeProductQuickPage()
  }, 1200)
}

const textInDialogAddCart: InfoType = {
  iconBeforeText: IconCartCheckFill,
  text: '已加入購物車',
  color: 'main-color',
  borderColor: 'main-color',
}

const isBackgroundLocked = useScrollLock(window.document.body)

onMounted(() => {
  isBackgroundLocked.value = true
})

onBeforeUnmount(() => {
  isBackgroundLocked.value = false
})
</script>

<template>
  <Teleport to="body">
    <div class="mask">
      <OnClickOutside class="out-product-container" @trigger="closeProductQuickPage">
        <div class="product-container">
          <div class="product-upbar">
            <div class="product-name">
              {{ product.name }}
            </div>
            <button class="product-close-btn" @click="closeProductQuickPage">
              <Icon-material-symbols-close />
            </button>
          </div>
          <div v-if="productImages[0] != null" class="product-img">
            <img :src="getPublicImgSrc(productImages[0].image)" alt="">
          </div>
          <FormKit
            form-class="$reset"
            type="form"
            :actions="false"
            incomplete-message=" "
            @submit="submitAddCart"
            @submit-invalid="() => { return }"
          >
            <div class="spec-num">
              <div class="spec-block">
                <div class="spec-num-title">
                  規格
                </div>
                <div class="spec-subblock">
                  <FormKit
                    v-if="hasSpecifications"
                    v-model="specPicked"
                    validation="required"
                    validation-visibility="live"
                    :validation-messages="{
                      required: '請選擇規格',
                    }"
                  >
                    <!-- eslint-disable-next-line vue/no-unused-vars -->
                    <template #wrapper="context">
                      <div class="spec-labels">
                        <label v-for="(spec, i) in productSpec" :key="`specifications-${i}`" class="spec-label" :class="{ active: specPicked === spec.id }">
                          <input
                            v-model="specPicked" class="spec-radio"
                            type="radio" name="specifications"
                            :value="spec.id"
                          >
                          {{ spec.specName }}
                        </label>
                      </div>
                    </template>
                  </FormKit>
                  <label v-else class="active">
                    <input
                      v-model="specPicked" class="spec-radio"
                      type="radio" name="specifications"
                      value="null"
                    >
                    無
                  </label>
                </div>
              </div>
              <div class="num-block">
                <div class="spec-num-title">
                  數量
                </div>
                <div class="num-product-container">
                  <FormKit
                    v-model="numOfProduct"
                    validation="required|between:1,10"
                    validation-visibility="live"
                    :validation-messages="{
                      required: '請輸入數量',
                      between: '請輸入 1~10 的數量',
                    }"
                  >
                    <!-- eslint-disable-next-line vue/no-unused-vars -->
                    <template #wrapper="context">
                      <input v-model="numOfProduct" name="amount" class="num-product" type="number" min="1" max="10">
                    </template>
                  </FormKit>
                </div>
              </div>
            </div>
            <div class="subtotal">
              小計：NT$ <span>{{ subtotal }}</span>
            </div>
            <div class="add-cart-btn-block">
              <PButton class="add-cart-btn" type="submit" :content="textInBtnAddCart" />
            </div>
          </FormKit>
        </div>
      </OnClickOutside>
    </div>
  </Teleport>
  <InfoDialog v-if="isOpenDialogAddCart" :text-in-dialog="textInDialogAddCart" />
</template>

<style scoped lang="scss">
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;

    .out-product-container {

      .product-container {
        background-color: var(--white-color);
        height: calc(100% - 10rem);
        width: 100%;
        border-radius: 1.5rem;
        border: solid 0.1rem var(--main-product-color);

        .product-upbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 3rem;
          box-sizing: border-box;
          padding: 0.5rem 0.6rem 0 1rem;
          font-size: 1.2rem;
          margin-bottom: 1rem;

          .product-name {
            font-weight: 500;
            color: var(--text-color);
          }

          .product-close-btn {
            display: flex;
            justify-content: center;
            align-items: center;

            .svg-icon {
              color: var(--main-color);
              width: 2rem;
              height: 2rem;
            }
          }
        }

        .product-img {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;

          img {
            width: 60%;
            height: auto;
          }
        }

        .spec-num {
          display: flex;
          justify-content: space-around;
          min-height: 5rem;

          .spec-block, .num-block {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            color: var(--main-color);

            input {
              text-align: center;
            }

            .spec-num-title {
              font-weight: 500;
              font-size: 1.2rem;
              padding-bottom: 0.6rem;
            }

            .spec-subblock {
              height: 60%;
              width: 100%;

              .spec-labels {
                width: 100%;
                display: flex;
                justify-content: start;
                gap: 0.5rem;
                flex-wrap: wrap;

                .spec-label {
                  cursor: pointer;
                }
              }

            }

            .num-product-container {
              width: 100%;
              height: 60%;

              .num-product {
                width: 100%;
                border: solid 0.1rem var(--main-color);
                padding: 0.3rem 0;
                outline: none;
              }
            }

          }

          .active {
              background-color: var(--main-color);
              color: var(--white-color);

            }

          label {
            border: solid 0.1rem var(--main-color);
            border-radius: 0.5rem;
            padding: 0.2rem 1.2rem 0.2rem 0.8rem;
            color: var(--main-color);
            transition-duration: 0.2s;

            input {
              width: 0.1px;
              height: 0.1px;

            }

            &:hover {
              background-color: var(--main-color);
              color: var(--white-color);
              transition-duration: 0.2s;
            }
          }

        }

        .subtotal {
          display: flex;
          justify-content: end;
          padding: 0.8rem 2rem 0 0;
          color: var(--text-color);
          font-size: 1.2rem;
          font-weight: 500;
          gap: 1rem;
        }

        .add-cart-btn-block {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1.5rem 0;

          .add-cart-btn {
            width: 50%;
          }
        }

      }
    }

  }

  @media screen and (min-width: 1061px) {
    .out-product-container {
      width: 36%;
    }
  }

  @media screen and (max-width: 1060px) {
    .out-product-container {
      width: 50%;
    }
  }

  @media screen and (min-width: 786px) {
    .spec-num {
      height: 10rem;

      .spec-block {
        width: 40%;
      }

       .num-block {
          width: 36%;
        }
    }

  }

  @media screen and (max-width: 785px) {
    .out-product-container {
      width: 60%;
      margin-top: 3rem;

      .spec-num {
        flex-direction: column;
        height: 10rem;
        align-items: center;

        .spec-block, .num-block {
          width: 90%;
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    .out-product-container {
      width: 95%;
    }
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
  }
</style>
