<script lang="ts" setup>
import { FormKitMessages } from '@formkit/vue'
import PButton from '@/components/PButton.vue'
import PCheckoutLayout from '@/components/PCheckoutLayout.vue'
import router from '@/router'
import { useOrderDataStore } from '@/stores/orderData'
import { getCurrentUser } from '@/api/users/getCurrentUser'
import { useUsersStore } from '@/stores/user'
import type { GetCurrentUserResponseData } from '@/api/users/getCurrentUser'
import type { BtnType } from '@/types'

const isOpenDiscount = ref(false)
const codeForDiscount = ref('')

const { resetOrderData } = useOrderDataStore()
const { userId } = storeToRefs(useUsersStore())
const { orderData } = storeToRefs(useOrderDataStore())
const currentUser = ref<GetCurrentUserResponseData>()

async function fetchCurrentUser() {
  currentUser.value = (await getCurrentUser({ id: userId.value })).data
}

onMounted(() => {
  fetchCurrentUser()
})

const isSameWithUser = ref(false)
function handleSameUserBtnClick() {
  if (currentUser.value == null)
    return
  if (isSameWithUser.value) {
    orderData.value.name = ''
    orderData.value.mobile = ''
    orderData.value.email = ''
  }
  else {
    orderData.value.name = currentUser.value.name
    orderData.value.mobile = currentUser.value.mobile
    orderData.value.email = currentUser.value.email
  }
  isSameWithUser.value = !isSameWithUser.value
}

const textInCheckoutBtn: BtnType = {
  text: '確認結帳',
  color: 'main-product-color',
}

function handleSubmit() {
  router.push({ name: 'delivery' })
}
</script>

<template>
  <PCheckoutLayout v-slot="slotProps" target="checkout">
    <FormKit
      form-class="$reset"
      type="form"
      :actions="false"
      incomplete-message=" "
      @submit="handleSubmit"
      @submit-invalid="() => { return }"
    >
      <div class="container">
        <div class="accept-container">
          <div class="title">
            收件資料
            <button type="button" class="same-user-btn" @click="handleSameUserBtnClick">
              <icon-material-symbols-check-box-outline v-if="isSameWithUser" /><icon-material-symbols-check-box-outline-blank v-else />同使用者資料
            </button>
          </div>
          <div class="data-block">
            <FormKit
              v-model="orderData.name"
              type="text"
              name="name"
              validation="required:trim"
              validation-visibility="live"
              :validation-messages="{
                required: '請輸入姓名',
              }"
            >
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template #wrapper="context">
                <div class="data-item">
                  <div>姓名</div>
                  <input v-model="orderData.name" type="text">
                </div>
              </template>
            </FormKit>
            <FormKit
              v-model="orderData.mobile"
              type="text"
              name="name"
              validation="required|matches:/^[0-9]{10}$/"
              validation-visibility="live"
              :validation-messages="{
                required: '請輸入電話',
                matches: '請輸入正確的電話號碼',
              }"
            >
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template #wrapper="context">
                <div class="data-item">
                  <div>電話</div>
                  <input v-model="orderData.mobile" type="text">
                </div>
              </template>
            </FormKit>
            <FormKit
              v-model="orderData.email"
              type="text"
              name="email"
              validation="required|email"
              validation-visibility="live"
              :validation-messages="{
                required: '請輸入電子信箱',
                email: '請輸入正確的電子信箱',
              }"
            >
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template #wrapper="context">
                <div class="data-item">
                  <div>電子信箱</div>
                  <input v-model="orderData.email" type="text">
                </div>
              </template>
            </FormKit>
          </div>
        </div>
        <div class="check-container">
          <button type="button" class="discount-btn" @click="isOpenDiscount = !isOpenDiscount">
            使用優惠代碼
          </button>
          <div v-show="isOpenDiscount" class="discount-input">
            <input v-model="codeForDiscount" type="text"><button type="button">
              套用
            </button>
          </div>
          <div class="detail">
            共 {{ slotProps.num }} 件商品｜總金額 NT$ {{ slotProps.total }}
          </div>
          <PButton class="check-btn" type="submit" :content="textInCheckoutBtn" />
        </div>
      </div>
    </FormKit>
  </PCheckoutLayout>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 1rem;
  display: flex;
  margin: 2rem 0;
  box-sizing: border-box;

  .accept-container {
    width: 60%;

    .title {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--main-product-color);
      width: 100%;
      display: flex;
      justify-content: start;
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

      .same-user-btn {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        background: transparent;
        outline: none;
        border: none;
        font-size: 0.8rem;
        gap: 0.2rem;
        color: var(--main-product-color);
        margin-left: 2rem;
        cursor: pointer;
      }
    }

    .data-block {
      display: flex;
      flex-direction: column;
      background-color: var(--white-color);
      width: 100%;
      padding: 1rem 1.5rem;
      box-sizing: border-box;

      .data-item {
        display: flex;
        padding-top: 1rem;
        gap: 2rem;

        div {
          width: 20%;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--text-color);
        }

        input {
          width: 60%;
          border: 1px solid var(--main-color);
          outline: none;
          height: 2rem;
        }

      }
    }
  }

  .check-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: end;
    gap: 1rem;

    .discount-btn {
      background: transparent;
      border: none;
      outline: none;
      text-decoration: underline;
      color: var(--main-product-color);
      font-size: 0.8rem;
      cursor: pointer;
    }

    .discount-input {
      display: flex;

      input {
        outline: none;
        border: 0.1rem solid var(--main-product-color);
        height: 1.5rem;
        padding-left: 0.3rem;
      }

      button {
        outline: none;
        border: none;
        background-color: var(--main-product-color);
        color: var(--white-color);
        cursor: pointer;

        &:hover {
          opacity: 0.8;

        }
      }
    }

    .detail {
      color: var(--text-color);
      letter-spacing: 1px;
      font-weight: 500;
    }

    .check-btn {
      width: 50%;
    }
  }
}

@media screen and (max-width: 835px) {
  .container {
    flex-direction: column;
    align-items: center;
    padding: 0;

    .accept-container {
      width: 100%;

      .title {
        padding-left: 2rem;

        &::after {
          left: 2.3rem;
        }
      }

      .data-block {
        padding: 0rem 1rem;

        .data-item {
          div {
            width: 30%;
          }
        }
      }
    }

    .check-container {
      width: 100%;
      margin-top: 1.5rem;
      align-items: center;
    }
  }
}

@media screen and (min-width: 548px) {
  .data-block {
    border: 1px solid var(--main-product-color);
  }
}

@media screen and (max-width: 547px) {
  .data-block {
    border-top: 1px solid var(--main-product-color);
    border-bottom: 1px solid var(--main-product-color);
  }
}
</style>
