<script setup lang="ts">
import type { PropType } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import PButton from './PButton.vue'
import type { BankType } from '@/types/index'
import type { BtnType } from '@/types'
import IconCloseFill from '~icons/mingcute/close-fill'
import { addPayment } from '@/api/payment/addPayment'
import { updatePayment } from '@/api/payment/updatePayment'
import { deletePayment } from '@/api/payment/deletePayment'

const props = defineProps({
  target: {
    type: String as PropType<'add' | 'edit'>,
    required: true,
  },
  currentBankData: {
    type: [Object] as PropType<BankType>,
    required: true,
  },
})

const emit = defineEmits(['closeDialog', 'updatePaymentList'])

const bankData = ref(props.currentBankData)

function closeDialog() {
  emit('closeDialog')
}

const textInAdd: BtnType = {
  text: '加入',
  color: 'main-product-color',
}

const textInEdit: BtnType = {
  text: '完成',
  color: 'main-product-color',
}

const textInDelete: BtnType = {
  text: '刪除',
  color: 'main-color',
}

// 按 ESC 可以關閉快速購物車
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    closeDialog()
}, false)

const isBackgroundLocked = useScrollLock(window.document.body)

onMounted(() => {
  isBackgroundLocked.value = true
})

onBeforeUnmount(() => {
  isBackgroundLocked.value = false
})

async function addBank() {
  const data = props.currentBankData
  if (data == null)
    return
  await addPayment({
    type: 'transfer',
    cardNumber: '',
    cardOwner: '',
    cardValidCode: '',
    cardValidDate: '',
    bankCode: data.bankCode,
    bankAccount: data.bankAccount,
  })
}

async function updateBank() {
  if (props.currentBankData == null)
    return

  await updatePayment({
    cardNumber: '',
    cardOwner: '',
    cardValidCode: '',
    cardValidDate: '',
    ...props.currentBankData,
  })
}

function handleSubmit() {
  if (props.target === 'add')
    addBank()
  else
    updateBank()

  emit('updatePaymentList')
  closeDialog()
}

async function handleDelete() {
  await deletePayment({ id: props.currentBankData.id })
  emit('updatePaymentList')
  closeDialog()
}
</script>

<template>
  <Teleport to="body">
    <div class="mask">
      <OnClickOutside class="container" @trigger="closeDialog">
        <div v-if="target === 'add'" class="title">
          <div>新增銀行帳號</div><button @click="closeDialog">
            <IconCloseFill />
          </button>
        </div>
        <div v-if="target === 'edit'" class="title">
          <div>編輯銀行帳號</div><button @click="closeDialog">
            <IconCloseFill />
          </button>
        </div>
        <div class="form-container">
          <FormKit
            type="form"
            :actions="false"
            incomplete-message=" "
            @submit="handleSubmit"
            @submit-invalid="() => { return }"
          >
            <div class="inputs-container">
              <FormKit
                v-model="bankData.bankCode"
                type="text"
                validation="required|number|length:3, 3"
                validation-visibility="live"
                :validation-messages="{
                  required: '這是必要輸入',
                  number: '請輸入數字',
                  length: '請輸入正確的銀行代碼',
                }"
              >
                <template #wrapper>
                  <div class="sub-title">
                    銀行代碼
                  </div>
                  <input v-model="bankData.bankCode" type="text">
                </template>
              </FormKit>
              <FormKit
                v-model="bankData.bankAccount"
                type="text"
                validation="required:trim|number|length:14, 20"
                validation-visibility="live"
                :validation-messages="{
                  required: '這是必要輸入',
                  number: '請輸入數字',
                  length: '請輸入正確的卡號',
                }"
              >
                <template #wrapper>
                  <div class="sub-title">
                    銀行帳號
                  </div>
                  <input v-model="bankData.bankAccount" type="text">
                </template>
              </FormKit>
            </div>
            <div class="btn-container">
              <PButton v-if="target === 'add'" :content="textInAdd" type="submit" />
              <PButton v-if="target === 'edit'" :content="textInDelete" type="button" @click="handleDelete" />
              <PButton v-if="target === 'edit'" :content="textInEdit" type="submit" />
            </div>
          </FormKit>
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
    width: 40%;
    min-width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 0.1rem solid var(--main-color);
    border-radius: 1rem;
    background-color: var(--white-color);

    .title {
      width: 100%;
      padding-bottom: 1rem;
      font-size: 1.2rem;
      color: var(--text-color);
      display: flex;
      justify-content: space-between;

      button {
        outline: none;
        border: none;
        background: transparent;
        cursor: pointer;

        .svg-icon {
          color: var(--text-color);
        }
      }
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .inputs-container {
      width: 20rem;

      .sub-title {
        margin-bottom: 0.5rem;
        color: var(--main-color);
        font-weight: 500;
      }

      input {
        outline: none;
        border: 0.1rem solid var(--main-color);
        width: 100%;
        height: 2rem;
      }
    }

    .btn-container {
      display: flex;
      gap: 1rem;
      margin-top: 3rem;
      width: 100%;
    }
  }
}
</style>
