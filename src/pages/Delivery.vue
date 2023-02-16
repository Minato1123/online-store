<script lang="ts" setup>
import PButton from '@/components/PButton.vue'
import InfoDialog from '@/components/InfoDialog.vue'
import router from '@/router'
import PCheckoutLayout from '@/components/PCheckoutLayout.vue'
import IconMoneyDollarCircleLine from '~icons/ri/money-dollar-circle-line'
import IconCheckCircleRounded from '~icons/material-symbols/check-circle-rounded'
import IconCrossCircle from '~icons/gridicons/cross-circle'
import { useOrderDataStore } from '@/stores/orderData'
import { addOrder } from '@/api/boughtItems/addOrder'
import type { AddOrderResponseData, BoughtItem } from '@/api/boughtItems/addOrder'
import { type GetProductListFromShoppingCartByUserIdResponseData, getProductListFromShoppingCartByUserId } from '@/api/cartItems/getProductListFromShoppingCartByUserId'
import { getProduct } from '@/api/products/getProduct'
import { getProductImagesByProductId } from '@/api/productImages/getProductImagesByProductId'
import { getProductSpecificationsByProductId } from '@/api/productSpecifications/getProductSpecificationsByProductId'
import { deleteProductFromCart } from '@/api/cartItems/deleteProductFromCart'
import { useUsersStore } from '@/stores/user'
import { useCartUpdatedEventBus } from '@/composables/useCartUpdatedEventBus'

const { orderData } = storeToRefs(useOrderDataStore())
const { userId } = storeToRefs(useUsersStore())
const { emit: emitCartUpdated } = useCartUpdatedEventBus()

const textInSureCheckoutBtn = {
  text: '確認付款',
  color: 'main-product-color',
  afterTextIcon: IconMoneyDollarCircleLine,
}

const taiwanCounty = [
  '台北市',
  '新北市',
  '桃園市',
  '台中市',
  '台南市',
  '高雄市',
  '基隆市',
  '新竹市',
  '嘉義市',
  '新竹縣',
  '苗栗縣',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義縣',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '台東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
]
const paymentMethodList = [
  {
    label: '信用卡／金融卡',
    value: 'credit-card',
  },
  {
    label: '銀行轉帳',
    value: 'transfer',
  },
  {
    label: '貨到付款',
    value: 'cash-on-delivery',
  },
]

const delveryMethodList = [
  {
    label: '宅配',
    value: 'home-delivery',
  },
  {
    label: '超商取貨',
    value: 'convenience-store',
  },
]

const isDialogOpen = ref(false)
const isSaveSuccess = ref(true)

const addedOrderData = ref<AddOrderResponseData>()
const cartList = ref<GetProductListFromShoppingCartByUserIdResponseData[]>()
const toBuyProductList = ref<BoughtItem[]>()

async function fetchCartList() {
  cartList.value = (await getProductListFromShoppingCartByUserId({ userId: userId.value })).data
}

async function fetchToBuyProductList() {
  if (cartList.value == null)
    return

  toBuyProductList.value = await Promise.all(cartList.value.map(async (item) => {
    const product = (await getProduct({ id: item.productId })).data
    const productImages = (await getProductImagesByProductId({ productId: item.productId })).data
    const productSpecList = (await getProductSpecificationsByProductId({ productId: item.productId })).data
    const productSpec = productSpecList.find(spec => spec.id === item.specificationId)

    return {
      productId: item.productId,
      name: product.name,
      image: productImages[0].image,
      specificationName: productSpec == null ? null : productSpec.specName,
      amount: item.amount,
      price: product.price,
    }
  }),

  )
}

async function handleCheckout() {
  isDialogOpen.value = false
  if (toBuyProductList.value == null)
    return
  if (isSaveSuccess.value === true) {
    if (cartList.value == null)
      return

    addedOrderData.value = (await addOrder({
      orderData: orderData.value,
      boughtItems: toBuyProductList.value,
    })).data
    router.replace({ name: 'completed', params: { orderId: addedOrderData.value.serialNumber } })
    await Promise.all(cartList.value.map(async (item) => {
      await deleteProductFromCart({ id: item.id })
    }))
    emitCartUpdated()
  }
  else { router.replace({ name: 'cart' }) }
}

onMounted(async () => {
  await fetchCartList()
  fetchToBuyProductList()
})

const orderSuccessDialog = {
  iconBeforeText: IconCheckCircleRounded,
  text: '訂單已送出！',
  color: 'main-color',
  borderColor: 'main-color',
  textInBtnOK: {
    text: '確定',
    color: 'match-color',
  },
}

const orderFailDialog = {
  iconBeforeText: IconCrossCircle,
  text: '訂單失敗！',
  additionalText: '請稍後再試一次',
  color: 'main-product-color',
  borderColor: 'main-product-color',
  textInBtnOK: {
    text: '確定',
    color: 'main-product-color',
  },
}

function handleSubmit() {
  isDialogOpen.value = true
}
</script>

<template>
  <PCheckoutLayout v-slot="slotProps" target="delivery">
    <FormKit
      form-class="$reset"
      type="form"
      :actions="false"
      incomplete-message=" "
      @submit="handleSubmit"
      @submit-invalid="() => { return }"
    >
      <div class="container">
        <div class="detail">
          共 {{ slotProps.num }} 件商品｜總金額 NT$ {{ slotProps.total }}
        </div>
        <div class="data-container">
          <div class="payment-container">
            <FormKit
              v-model="orderData.paymentType"
              type="radio"
              :options="paymentMethodList"
              validation="required"
              validation-visibility="live"
              :validation-messages="{
                required: '這是必要輸入',
              }"
            >
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template #fieldset="context">
                <div class="title">
                  付款方式
                </div>
                <div class="payment-block block">
                  <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="orderData.paymentType !== 'credit-card'" /><icon-ic-baseline-radio-button-checked v-show="orderData.paymentType === 'credit-card'" /><input v-model="orderData.paymentType" class="input-radio" value="credit-card" type="radio" name="payment">信用卡／金融卡</label>
                  <Transition>
                    <form v-if="orderData.paymentType === 'credit-card'" class="sub-content payment-credit-block" @submit.prevent>
                      <FormKit
                        v-model="orderData.cardNumber"
                        type="text"
                        validation="required|number|length:16, 16"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                          number: '請輸入數字',
                          length: '請輸入正確的卡號',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <div class="credit-input-block">
                            <div class="credit-title">
                              卡號
                            </div>
                            <input v-model="orderData.cardNumber" type="text">
                          </div>
                        </template>
                      </FormKit>
                      <FormKit
                        v-model="orderData.cardOwner"
                        type="text"
                        validation="required:trim"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <div class="credit-input-block">
                            <div class="credit-title">
                              持卡人姓名
                            </div>
                            <input v-model="orderData.cardOwner" type="text">
                          </div>
                        </template>
                      </FormKit>
                      <FormKit
                        v-model="orderData.cardValidDate"
                        type="text"
                        validation="required:trim|matches:/^([0-9]{2})\/([0-9]{2})$/"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                          matches: '請輸入正確的日期',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <div class="credit-input-block">
                            <div class="credit-title">
                              有效期
                            </div>
                            <input v-model="orderData.cardValidDate" type="text" placeholder="MM/YY">
                          </div>
                        </template>
                      </FormKit>
                      <FormKit
                        v-model="orderData.cardValidCode"
                        type="text"
                        validation="required:trim|number|length:3, 3"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                          number: '請輸入正確的安全碼',
                          length: '請輸入正確的安全碼',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <div class="credit-input-block">
                            <div class="credit-title">
                              安全碼
                            </div>
                            <input v-model="orderData.cardValidCode" type="text" maxlength="3">
                          </div>
                        </template>
                      </FormKit>
                    </form>
                  </Transition>
                  <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="orderData.paymentType !== 'transfer'" /><icon-ic-baseline-radio-button-checked v-show="orderData.paymentType === 'transfer'" /><input v-model="orderData.paymentType" class="input-radio" value="transfer" type="radio" name="payment">銀行轉帳</label>
                  <Transition>
                    <form v-if="orderData.paymentType === 'transfer'" class="sub-content transfer-block" @submit.prevent>
                      <button class="account-btn">
                        選取銀行帳戶
                      </button>
                      <FormKit
                        v-model="orderData.bankCode"
                        type="text"
                        validation="required|number|length:3, 3"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                          number: '請輸入數字',
                          length: '請輸入正確的銀行代碼',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <div class="transfer-input-block">
                            <div class="transfer-title">
                              銀行代碼
                            </div>
                            <input v-model="orderData.bankCode" type="text">
                          </div>
                        </template>
                      </FormKit>
                      <FormKit
                        v-model="orderData.bankAccount"
                        type="text"
                        validation="required|number|length:10, 14"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                          number: '請輸入數字',
                          length: '請輸入正確的銀行代碼',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <div class="transfer-input-block">
                            <div class="transfer-title">
                              帳戶號碼
                            </div>
                            <input v-model="orderData.bankAccount" type="text">
                          </div>
                        </template>
                      </FormKit>
                    </form>
                  </Transition>
                  <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="orderData.paymentType !== 'cash-on-delivery'" /><icon-ic-baseline-radio-button-checked v-show="orderData.paymentType === 'cash-on-delivery'" /><input v-model="orderData.paymentType" class="input-radio" value="cash-on-delivery" type="radio" name="payment">貨到付款</label>
                </div>
              </template>
            <!-- <template #decorator="context">
              <div class="checked-deco">
                <icon-ic-baseline-radio-button-checked />
              </div>
              <div class="deco">
                <icon-ic-baseline-radio-button-unchecked />
              </div>
            </template> -->
            </FormKit>
          </div>
          <div class="delivery-container">
            <FormKit
              v-model="orderData.deliveryType"
              :options="delveryMethodList"
              type="radio"
              validation="required"
              validation-visibility="live"
              :validation-messages="{
                required: '這是必要輸入',
              }"
            >
              <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
              <template #fieldset="context">
                <div class="title">
                  收件資料
                </div>
                <div class="block">
                  <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="orderData.deliveryType !== 'delivery'" /><icon-ic-baseline-radio-button-checked v-show="orderData.deliveryType === 'delivery'" /><input v-model="orderData.deliveryType" class="input-radio" value="delivery" type="radio" name="delivery">宅配</label>
                  <Transition>
                    <form v-if="orderData.deliveryType === 'delivery'" class="sub-content delivery-block" @submit.prevent>
                      <FormKit
                        v-model="orderData.county"
                        validation="required"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <select v-model="orderData.county" class="delivery-dropdown" name="county">
                            <option :value="null">
                              縣市
                            </option>
                            <option v-for="(county, i) in taiwanCounty" :key="`county-${i}`" :value="county">
                              {{ county }}
                            </option>
                          </select>
                        </template>
                      </FormKit>
                      <FormKit
                        v-model="orderData.address"
                        type="text"
                        validation="required:trim"
                        validation-visibility="live"
                        :validation-messages="{
                          required: '這是必要輸入',
                        }"
                      >
                        <!-- eslint-disable-next-line vue/no-unused-vars, vue/no-template-shadow -->
                        <template #wrapper="context">
                          <input v-model="orderData.address" placeholder="請輸入詳細地址..." class="address-input" type="text" name="address">
                        </template>
                      </FormKit>
                    </form>
                  </Transition>
                  <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="orderData.deliveryType !== 'self-pickup'" /><icon-ic-baseline-radio-button-checked v-show="orderData.deliveryType === 'self-pickup'" /><input v-model="orderData.deliveryType" class="input-radio" value="self-pickup" type="radio" name="delivery">超商取貨</label>
                  <div v-if="orderData.deliveryType === 'self-pickup'" class="sub-content convience-block">
                    <button class="select-btn">
                      選取超商
                    </button>
                    <span class="select-status">尚未選取超商</span>
                  </div>
                </div>
              </template>
            </Formkit>
          </div>
        </div>
        <div class="complete-btn">
          <PButton type="submit" class="btn" :content="textInSureCheckoutBtn" />
        </div>
      </div>
    </FormKit>
  </PCheckoutLayout>
  <InfoDialog v-if="isDialogOpen && isSaveSuccess" :text-in-dialog="orderSuccessDialog" @close-info-dialog="handleCheckout" />
  <InfoDialog v-if="isDialogOpen && !isSaveSuccess" :text-in-dialog="orderFailDialog" @close-info-dialog="handleCheckout" />
</template>

<style lang="scss" scoped>
.checked-deco {
  display: none;
}

.deco {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
}

[data-checked] .checked-deco {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

}

[data-checked] .deco {
  display: none;
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-14px);
  opacity: 0;
}
.input-radio {
  width: 0.1px;
  height: 0.1px;
}

input {
  outline: none;
  border: 1px solid var(--main-color);
  height: 2rem;
  box-sizing: border-box;
  padding-left: 0.2rem;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin: 1rem 0 4rem 0;
  gap: 2rem;

  .detail {
    display: flex;
    justify-content: end;
    color: var(--text-color);
    letter-spacing: 1px;
    font-weight: 500;
  }

  .data-container {
    display: flex;
    justify-content: space-between;

    .title {
      display: flex;
      justify-content: start;
      align-items: center;
      color: var(--main-product-color);
      font-weight: 500;
      font-size: 1.4rem;
      position: relative;
      margin-bottom: 1rem;

      &::after {
        content: '';
        position: absolute;
        width: 6rem;
        height: 0.2rem;
        background-color: var(--main-product-color);
        bottom: -0.4rem;
        left: 0.3rem;
      }
    }

    .block {
      background-color: var(--white-color);
      border: 1px solid var(--main-product-color);
      box-sizing: border-box;
      padding: 1rem;
      height: 36rem;
    }

    .sub-title {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 0.2rem;
      margin-bottom: 1rem;
      color: var(--text-color);
      cursor: pointer;

    }
    .sub-content {
      margin-bottom: 1rem;
      margin-left: 0.5rem;
      padding-left: 1rem;
      border-left: 2px solid var(--text-color);
    }

    .payment-container {

      .payment-block {
        display: flex;
        flex-direction: column;

        .payment-credit-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .credit-input-block {
            display: flex;
            justify-content: space-between;

            .credit-title {
              color: var(--text-color);
            }

          }
        }

        .transfer-block {
          display: flex;
          flex-direction: column;

          .account-btn {
            width: 50%;
            background-color: var(--main-color);
            outline: none;
            border: none;
            color: var(--white-color);
            padding: 0.2rem 0;
            cursor: pointer;
            box-shadow: 1px 1px 0 0 rgb(0 0 0 / 20%);
            margin-bottom: 1rem;
          }

          .transfer-input-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;

            .transfer-title {
              color: var(--text-color);
            }
          }
        }

      }
    }

    .delivery-container {

      .delivery-block {
        display: flex;
        flex-direction: column;

        .delivery-dropdown {
          outline: none;
          border: 1px solid var(--main-color);
          color: var(--main-color);
          height: 2rem;
          box-sizing: border-box;
          width: 6rem;
          margin-right: 1rem;
          text-align: center;
        }

        input {
          flex-grow: 1;
        }

        .address-input {
          width: 80%;
        }
      }

      .convience-block {
        display: flex;
        justify-content: start;
        align-items: center;

        .select-btn {
          width: 6rem;
          background-color: var(--main-color);
          outline: none;
          border: none;
          color: var(--white-color);
          cursor: pointer;
          padding: 0.2rem 0;
          box-shadow: 1px 1px 0 0 rgba($color: #000000, $alpha: 0.2);
          margin-right: 1rem;
        }

        .select-status {
          color: var(--text-color);
        }
      }

    }
  }

  .complete-btn {
    display: flex;
    justify-content: end;
    .btn {
      width: 10rem;
    }
  }
}

@media screen and (min-width: 916px) {

  .block {
    height: 30rem;
  }
  .credit-input-block {
    align-items: center;

    .credit-title {
      width: 30%;
    }
  }
}

@media screen and (max-width: 915px) {

  .block {
    height: 30rem;
  }
  .credit-input-block {
    flex-direction: column;
    align-items: flex-start;

    .credit-title {
      width: 100%;
    }
  }
}

@media screen and (min-width: 731px) {
  .payment-container {
    width: 40%;
  }

  .delivery-container {
    width: 55%;

  }
}

@media screen and (max-width: 730px) {
  .data-container {
    flex-direction: column;
    gap: 1rem;

    .payment-container {
      width: 100%;

      .credit-input-block {
        input {
          width: 100%;
        }
      }
    }

    .delivery-container {
      width: 100%;

      .delivery-block {
        gap: 1rem;

        .delivery-dropdown {
          width: 100%;
        }
      }

      .block {
        height: 14rem;
      }
    }
  }
}
</style>
