<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import type { Product } from '../types/index'
import { getPublicImgSrc } from '../utils/index'
import { useShoppingCartStore } from '../stores/shoppingCart'
import PButton from './PButton.vue'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const emit = defineEmits(['closeProductQuickPage'])

const { addShoppingCart } = useShoppingCartStore()

const numOfProduct = ref(1)
const subtotal = computed(() => numOfProduct.value * props.product.price)
function closeProductQuickPage() {
  emit('closeProductQuickPage')
}

const specPicked: Ref<null | string> = ref(null)
if (props.product.specifications.length > 0)
  specPicked.value = 'spec-0'

const hasSpecifications = ref(false)

if (props.product.specifications.length === 0)
  hasSpecifications.value = true
else
  hasSpecifications.value = false

const textInBtnAddCart = {
  text: '加入購物車',
  color: 'main-product-color',
}

// 按 ESC 可以關閉快速購物車
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    closeProductQuickPage()
}, false)

function submitAddCart() {
  addShoppingCart(props.product.id, specPicked.value, numOfProduct.value)
  closeProductQuickPage()
}
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
          <div class="product-img">
            <img :src="getPublicImgSrc(product.images[0])" alt="">
          </div>
          <form @submit.prevent="submitAddCart">
            <div class="spec-num">
              <div class="spec-block">
                <div class="spec-num-title">
                  規格
                </div>
                <div class="spec-subblock">
                  <label v-for="(spec, i) in product.specifications" :key="`specifications-${i}`" class="spec-label" :class="{ active: specPicked === `spec-${i}` }">
                    <input
                      v-model="specPicked" class="spec-radio"
                      type="radio" name="specifications"
                      :value="`spec-${i}`"
                    >
                    {{ spec }}
                  </label>
                  <label v-if="hasSpecifications" class="active">
                    <input
                      v-model="specPicked" class="spec-radio"
                      type="radio" name="specifications"
                      value="null" disabled
                    >
                    無
                  </label>
                </div>
              </div>
              <div class="num-block">
                <div class="spec-num-title">
                  數量
                </div>
                <input v-model="numOfProduct" name="amount" class="num-product" type="number" min="1" max="10">
              </div>
            </div>
            <div class="subtotal">
              小計：NT$ <span>{{ subtotal }}</span>
            </div>
            <div class="add-cart-btn-block">
              <PButton type="submit" :content="textInBtnAddCart" />
            </div>
          </form>
        </div>
      </OnClickOutside>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;

    .out-product-container {

      .product-container {
        background-color: var(--white-color);
        height: calc(100% - 10rem);
        width: 100%;

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

          img {
            width: 70%;
            height: auto;
          }
        }

        .spec-num {
          display: flex;
          justify-content: space-around;
          align-items: center;
          min-height: 5rem;

          .spec-block, .num-block {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 100%;
            color: var(--main-color);

            input {
              text-align: center;
            }

            .spec-num-title {
              font-weight: 500;
              font-size: 1.2rem;
            }

            .spec-subblock {
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;

              .spec-label {
                cursor: pointer;

              }
            }

            .num-product {
              border: solid 0.1rem var(--main-color);
              padding: 0.3rem 0;
              outline: none;
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
      height: 5rem;

      .spec-block {
        width: 46%;
      }

       .num-block {
          width: 36%;
        }
    }

  }

  @media screen and (max-width: 785px) {
    .out-product-container {
      width: 60%;

      .spec-num {
        flex-direction: column;
        height: 10rem;

        .spec-block, .num-block {
          width: 50%;
        }
      }
    }
  }

  @media screen and (min-width: 577px) {
    .product-container {
      border-radius: 1.5rem;
      border: solid 0.1rem var(--main-product-color);
    }
  }

  @media screen and (max-width: 576px) {
    .out-product-container {
      width: 100%;
      .product-container {
        border-radius: 0;
        border-bottom: solid 0.1rem var(--main-product-color);
        border-top: solid 0.1rem var(--main-product-color);
      }
    }
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
  }
</style>
