<script lang="ts" setup>
import PButton from '@/components/PButton.vue'
import InfoDialog from '@/components/InfoDialog.vue'
import router from '@/router'
import PCheckoutLayout from '@/components/PCheckoutLayout.vue'
import IconMoneyDollarCircleLine from '~icons/ri/money-dollar-circle-line'
import IconCheckCircleRounded from '~icons/material-symbols/check-circle-rounded'
import IconCrossCircle from '~icons/gridicons/cross-circle'

const paymentMethod = ref('credit')
const delievryMethod = ref('homeDelivery')

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

const isDialogOpen = ref(false)
const isSaveSuccess = ref(true)

function handleCheckout() {
  isDialogOpen.value = false
  if (isSaveSuccess.value === true)
    router.replace({ path: '/completed' })
  else
    router.replace({ path: '/cart' })
}

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
</script>

<template>
  <PCheckoutLayout target="delivery">
    <div class="container">
      <div class="detail">
        共幾件商品｜總金額 NT$
      </div>
      <div class="data-container">
        <div class="payment-container">
          <div class="title">
            付款方式
          </div>
          <div class="payment-block block">
            <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="paymentMethod !== 'credit'" /><icon-ic-baseline-radio-button-checked v-show="paymentMethod === 'credit'" /><input v-model="paymentMethod" class="input-radio" value="credit" type="radio" name="payment">信用卡／金融卡</label>
            <form v-show="paymentMethod === 'credit'" class="sub-content payment-credit-block">
              <div class="credit-input-block">
                <div class="credit-title">
                  卡號
                </div>
                <input type="text">
              </div>
              <div class="credit-input-block">
                <div class="credit-title">
                  持卡人姓名
                </div>
                <input type="text">
              </div>
              <div class="credit-input-block">
                <div class="credit-title">
                  有效期
                </div>
                <input type="text" placeholder="MM/YY">
              </div>
              <div class="credit-input-block">
                <div class="credit-title">
                  安全碼
                </div>
                <input type="text" maxlength="3">
              </div>
            </form>
            <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="paymentMethod !== 'cashOnDelivery'" /><icon-ic-baseline-radio-button-checked v-show="paymentMethod === 'cashOnDelivery'" /><input v-model="paymentMethod" class="input-radio" value="cashOnDelivery" type="radio" name="payment">貨到付款</label>
          </div>
        </div>
        <div class="delivery-container">
          <div class="title">
            收件資料
          </div>
          <div class="block">
            <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="delievryMethod !== 'homeDelivery'" /><icon-ic-baseline-radio-button-checked v-show="delievryMethod === 'homeDelivery'" /><input v-model="delievryMethod" class="input-radio" value="homeDelivery" type="radio" name="delivery">宅配</label>
            <form v-show="delievryMethod === 'homeDelivery'" class="sub-content delivery-block">
              <select class="delivery-dropdown" name="county">
                <option>
                  縣市
                </option>
                <option v-for="(county, i) in taiwanCounty" :key="`county-${i}`" :value="i">
                  {{ county }}
                </option>
              </select>
              <input type="text" name="address">
            </form>
            <label class="sub-title"><icon-ic-baseline-radio-button-unchecked v-show="delievryMethod !== 'convienceStore'" /><icon-ic-baseline-radio-button-checked v-show="delievryMethod === 'convienceStore'" /><input v-model="delievryMethod" class="input-radio" value="convienceStore" type="radio" name="delivery">超商取貨</label>
            <div v-show="delievryMethod === 'convienceStore'" class="sub-content convience-block">
              <button class="select-btn">
                選取超商
              </button>
              <span class="select-status">尚未選取超商</span>
            </div>
          </div>
        </div>
      </div>
      <div class="complete-btn">
        <PButton class="btn" :content="textInSureCheckoutBtn" @click="isDialogOpen = true" />
      </div>
    </div>
  </PCheckoutLayout>
  <InfoDialog v-if="isDialogOpen && isSaveSuccess" :text-in-dialog="orderSuccessDialog" @close-info-dialog="handleCheckout" />
  <InfoDialog v-if="isDialogOpen && !isSaveSuccess" :text-in-dialog="orderFailDialog" @close-info-dialog="handleCheckout" />
</template>

<style lang="scss" scoped>
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
          gap: 1rem;

          .credit-input-block {
            display: flex;
            justify-content: space-between;

            .credit-title {
              color: var(--text-color);
            }

          }
        }

      }
    }

    .delivery-container {

      .delivery-block {
        display: flex;
        justify-content: start;

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
    height: 20rem;
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
    height: 26rem;
  }
  .credit-input-block {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

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

    .delivery-block {
      align-items: center;
    }
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
        flex-direction: column;
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
