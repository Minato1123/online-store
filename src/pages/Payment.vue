<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'
import AddCreditCardDialog from '@/components/AddCreditCardDialog.vue'
import AddBankDialog from '@/components/AddBankDialog.vue'
import { getPaymentByType } from '@/api/payment/getPaymentByType'
import type { BankType, CreditCradType } from '@/types/index'
import type { GetPaymentByTypeResponseData } from '@/api/payment/getPaymentByType'
import { useUsersStore } from '@/stores/user'

const { userId } = storeToRefs(useUsersStore())
const userCreditCards = ref<GetPaymentByTypeResponseData[]>()
const userAccounts = ref<GetPaymentByTypeResponseData[]>()

async function fetchPaymentList() {
  userCreditCards.value = (await getPaymentByType({ userId: userId.value, type: 'credit-card' })).data
  userAccounts.value = (await getPaymentByType({ userId: userId.value, type: 'transfer' })).data
}

onMounted(() => {
  fetchPaymentList()
})

const isOpenCreditCardtDialog = ref(false)
const isOpenBankDialog = ref(false)
type TypeTarget = 'add' | 'edit'
const targetOfDialog = ref<TypeTarget>()
const creditCardData = ref<CreditCradType>({
  id: -1,
  cardNumber: '',
  cardOwner: '',
  cardValidDate: '',
  cardValidCode: '',
})

function handleClickCreditCardBtn(target: TypeTarget, data?: GetPaymentByTypeResponseData) {
  isOpenCreditCardtDialog.value = true
  targetOfDialog.value = target
  if (target === 'add') {
    creditCardData.value = {
      id: -1,
      cardNumber: '',
      cardOwner: '',
      cardValidDate: '',
      cardValidCode: '',
    }
  }
  else if (target === 'edit') {
    if (data) {
      creditCardData.value = {
        id: data.id,
        cardNumber: data.cardNumber ?? '',
        cardOwner: data.cardOwner ?? '',
        cardValidDate: data.cardValidDate ?? '',
        cardValidCode: data.cardValidCode ?? '',
      }
    }
  }
}

const bankData = ref<BankType>({
  id: -1,
  bankCode: '',
  bankAccount: '',
})

function handleClickBankBtn(target: TypeTarget, data?: GetPaymentByTypeResponseData) {
  isOpenBankDialog.value = true
  targetOfDialog.value = target

  if (target === 'add') {
    bankData.value = {
      id: -1,
      bankCode: '',
      bankAccount: '',
    }
  }
  else if (target === 'edit') {
    if (data) {
      bankData.value = {
        id: data.id,
        bankCode: data.bankCode ?? '',
        bankAccount: data.bankAccount ?? '',
      }
    }
  }
}
</script>

<template>
  <PUserLayout>
    <div class="payment-container">
      <div class="main-block">
        <div class="credit-card-block block">
          <div class="subtitle">
            信用卡／金融卡
          </div>
          <div class="credit-card-content content">
            <div v-for="(data, i) in userCreditCards" :key="`card-${i + 1}`" class="item" @click="handleClickCreditCardBtn('edit', data)">
              <div>（{{ i + 1 }}）</div>
              <div class="item-name">
                {{ data.cardOwner }}
              </div>
              <div class="item-number">
                *{{ data.cardNumber?.slice(-4) }}
              </div>
            </div>
            <div class="add-btn-container">
              <button class="add-btn" @click="handleClickCreditCardBtn('add')">
                <icon-material-symbols-add />新增信用卡
              </button>
            </div>
          </div>
        </div>
        <div class="bank-block block">
          <div class="subtitle">
            銀行帳號
          </div>
          <div class="bank-content content">
            <div v-for="(account, i) in userAccounts" :key="`account-${i + 1}`" class="item" @click="handleClickBankBtn('edit', account)">
              <div>（{{ i + 1 }}）</div>
              <div class="item-name">
                {{ account.bankCode }}
              </div>
              <div class="item-number">
                *{{ account.bankAccount?.slice(-4) }}
              </div>
            </div>
            <div class="add-btn-container">
              <button class="add-btn" @click="handleClickBankBtn('add')">
                <icon-material-symbols-add />新增銀行帳號
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PUserLayout>
  <AddCreditCardDialog v-if="isOpenCreditCardtDialog && targetOfDialog" :target="targetOfDialog" :current-credit-card-data="creditCardData" @close-dialog="isOpenCreditCardtDialog = false" @update-payment-list="fetchPaymentList" />
  <AddBankDialog v-if="isOpenBankDialog && targetOfDialog" :target="targetOfDialog" :current-bank-data="bankData" @close-dialog="isOpenBankDialog = false" @update-payment-list="fetchPaymentList" />
</template>

<style lang="scss" scoped>
  .payment-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 2rem;

    .main-block {
      overflow-y: auto;
      .block {
        margin-bottom: 2rem;

        .subtitle {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;

          .item {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            padding: 0.8rem 0;
            transition: all 0.2s;
            color: var(--text-color);

            &:hover {
              color: var(--main-product-color);
              opacity: 0.8;
            }
          }
          .add-btn-container {
            width: 100%;
            display: flex;
            justify-content: center;
            .add-btn {
              background: transparent;
              background-color: var(--main-color);
              border-radius: 5rem;
              border: none;
              outline: none;
              color: var(--white-color);
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0.3rem 0;
              margin-top: 1rem;
              transition: all 0.2s;
              box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);

              &:hover {
                opacity: 0.8;
                cursor: pointer;
              }
            }
          }

        }
      }
    }
  }

  @media screen and (min-width: 541px) {
    .add-btn {
        width: 50%;
      }
  }

  @media screen and (max-width: 540px) {
    .payment-container {
      padding: 2rem 1rem;

      .add-btn {
        width: 100%;
      }
    }
  }
</style>
