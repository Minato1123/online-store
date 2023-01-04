<script lang="ts" setup>
import { useRegisterStore } from '../stores/registerForm'
import PLoginLayout from '@/components/PLoginLayout.vue'

const textInBtnRegister = {
  text: '註冊',
  color: 'main-color',
}

const pageContent = ref('register')

const routeNameForLogin = { name: 'login' }

const { errors, name, birthday, mobile } = storeToRefs(useRegisterStore())
</script>

<template>
  <PLoginLayout :text-in-btn="textInBtnRegister" :route-name="routeNameForLogin" :target="pageContent">
    <template #title>
      會員註冊
    </template>
    <template #login-btn>
      <icon-ri-user-follow-fill />
      <p class="register-btn-text">
        已有帳號登入
      </p>
    </template>
    <template #email>
      <span class="required-star">*</span>電子信箱
    </template>
    <template #password>
      <span class="required-star">*</span>密碼
      <span class="notes">請包含數字及英文字母，八碼以上</span>
    </template>
    <template #right>
      <div class="else-input-block space-top">
        <div class="else-input-title">
          <span class="required-star">*</span>姓名
        </div>
        <input
          v-model="name" v-tooltip="{
            content: errors.name,
            theme: 'register-validate-tooltip',
            shown: errors.name,
          }" name="name" class="else-input" type="text"
        >
      </div>
      <div class="else-input-block">
        <div class="else-input-title">
          <span class="required-star">*</span>生日
        </div>
        <input
          v-model="birthday" v-tooltip="{
            content: errors.birthday,
            theme: 'register-validate-tooltip',
            shown: errors.birthday,
          }" name="birthday" class="else-input" type="date"
        >
      </div>
      <div class="else-input-block">
        <div class="else-input-title">
          <span class="required-star">*</span>電話
        </div>
        <input
          v-model="mobile" v-tooltip="{
            content: errors.mobile,
            theme: 'register-validate-tooltip',
            shown: errors.mobile,
          }" name="mobile" class="else-input" type="tel"
        >
      </div>
    </template>
  </PLoginLayout>
</template>

<style lang="scss" scoped>
.register-btn-text {
  margin: 0;
  display: inline-block;
  width: 90%;
}
.required-star {
  color: var(--main-product-color);
}
.notes {
  margin-left: 3%;
  font-size: 0.6rem;
  font-weight: 300;
  color: var(--main-color);
}

.else-input-block {
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .else-input {
    width: 90%;
    height: 1.8rem;
    border: 1px solid var(--main-color);
    outline: none;
    font-size: 1rem;
    padding-left: 0.5rem;
  }
}

@media screen and (max-width: 820px) {

  .space-top {
  margin-top: 1.5rem;
  }
  .else-input-block {
    display: flex;
    justify-content: center;
    align-items: center;
    .else-input-title {
      width: 80%;
    }

    .else-input {
      width: 80%;
    }
  }
}
</style>
