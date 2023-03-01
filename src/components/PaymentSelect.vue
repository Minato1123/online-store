<script setup lang="ts">
import type { PropType } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import IconCloseFill from '~icons/mingcute/close-fill'
import { useUsersStore } from '@/stores/user'
import { type GetPaymentByTypeResponseData, getPaymentByType } from '@/api/payment/getPaymentByType'

const props = defineProps({
  target: {
    type: String as PropType<'credit-card' | 'transfer'>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'closeDialog', paymentData?: GetPaymentByTypeResponseData): void
}>()
const { userId } = storeToRefs(useUsersStore())

// 按 ESC 可以關閉快速購物車
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    closeDialog()
}, false)

const isBackgroundLocked = useScrollLock(window.document.body)

onMounted(() => {
  fetchPaymentSelectList()
  isBackgroundLocked.value = true
})

onBeforeUnmount(() => {
  isBackgroundLocked.value = false
})

function closeDialog() {
  emit('closeDialog')
}

const paymentSelectList = ref<GetPaymentByTypeResponseData[]>([])

async function fetchPaymentSelectList() {
  if (props.target === 'credit-card')
    paymentSelectList.value = (await getPaymentByType({ userId: userId.value, type: 'credit-card' })).data
  else if (props.target === 'transfer')
    paymentSelectList.value = (await getPaymentByType({ userId: userId.value, type: 'transfer' })).data
}

function handleSelectPayment(paymentData: GetPaymentByTypeResponseData) {
  emit('closeDialog', paymentData)
}
</script>

<template>
  <Teleport to="body">
    <div class="mask">
      <OnClickOutside class="container" @trigger="closeDialog">
        <div class="title-container">
          <div v-if="props.target === 'credit-card'" class="title">
            信用卡
          </div>
          <div v-else-if="props.target === 'transfer'" class="title">
            銀行轉帳
          </div>
          <button @click="closeDialog">
            <IconCloseFill />
          </button>
        </div>
        <div class="payment-container">
          <div v-if="props.target === 'credit-card'" class="payment-titles">
            編號 ／ 持卡人姓名 ／ 卡號末四碼
          </div>
          <div v-else-if="props.target === 'transfer'" class="payment-titles">
            編號 ／ 銀行代碼 ／ 帳號末四碼
          </div>
          <button v-for="(item, i) in paymentSelectList" :key="`payment-${i}`" class="payment-btn" @click="handleSelectPayment(item)">
            <div>
              （{{ i + 1 }}）
            </div>
            <div v-if="item.cardOwner !== ''">
              {{ item.cardOwner }}
            </div>
            <div v-if="item.cardNumber !== ''">
              *{{ item.cardNumber.slice(-4) }}
            </div>
            <div v-if="item.bankCode !== ''">
              {{ item.bankCode }}
            </div>
            <div v-if="item.bankAccount !== ''">
              *{{ item.bankAccount.slice(-4) }}
            </div>
          </button>
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
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--white-color);
    border-radius: 1rem;
    padding: 1rem;
    border: 0.1rem solid var(--main-color);
    width: 100%;
    max-width: 36rem;

    .title-container {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title {
        color: var(--text-color);
        font-size: 1.2rem;
      }

      button {
        border: none;
        outline: none;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        .svg-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--text-color)
        }

        &:hover {
          opacity: 0.5;
        }
      }
    }

    .payment-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      .payment-titles {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        color: var(--text-color);
      }

      .payment-btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding: 0.7rem 0;
        border: 0.1rem solid var(--main-color);
        border-radius: 0.5rem;
        margin: 0.8rem 0;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        background: transparent;
        outline: none;
        color: var(--text-color);

        &:hover {
          background-color: var(--main-color);
          color: var(--white-color);
        }
      }
    }
  }
}
</style>
