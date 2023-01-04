<script lang="ts" setup>
import type { PropType, Ref } from 'vue'
import { type RouteLocationRaw, RouterLink, RouterView } from 'vue-router'
import { useLoginStore } from '../stores/loginForm'
import { useRegisterStore } from '../stores/registerForm'

import PButton from './PButton.vue'

import type { BtnType } from '@/types'

const props = defineProps({
  textInBtn: {
    type: Object as PropType<BtnType>,
    required: true,
  },
  routeName: {
    type: Object as PropType<RouteLocationRaw>,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
})

let { login: submitForm } = useLoginStore()
let { errors, email, password } = storeToRefs(useLoginStore())

if (props.target === 'register') {
  submitForm = useRegisterStore().register
  const { errors: registerErrors, email: registerEmail, password: registerPassword } = storeToRefs(useRegisterStore())
  errors = registerErrors
  email = registerEmail
  password = registerPassword
}
</script>

<template>
  <form class="login-container" @submit="submitForm">
    <div class="login-left">
      <div class="title-container">
        <div class="title">
          <slot name="title">
            Title
          </slot>
        </div>
        <RouterLink :to="routeName" class="login-btn">
          <slot name="login-btn" />
        </RouterLink>
      </div>
      <div class="mail-password-block">
        <div class="mail">
          <div class="sub-title">
            <slot name="email">
              電子信箱
            </slot>
          </div>
          <input
            v-if="target === 'login'"
            v-model="email" name="email" class="sub-input" type="text"
          >
          <input
            v-else
            v-model="email" v-tooltip.top-end="{
              content: errors.email,
              theme: 'register-validate-tooltip',
              shown: errors.email,
            }" name="email" class="sub-input" type="text"
          >
        </div>
        <div class="password">
          <div class="sub-title">
            <slot name="password">
              密碼
            </slot>
          </div>
          <input
            v-if="target === 'login'"
            v-model="password" name="password" class="sub-input" type="password"
          >
          <input
            v-else
            v-model="password" v-tooltip="{
              content: errors.password,
              theme: 'register-validate-tooltip',
              shown: errors.password,
            }" name="password" class="sub-input" type="password"
          >
        </div>
      </div>
      <slot name="login-else" />
      <div
        class="footer-btn" :class="{
          'footer-btn-left-register': target === 'register',
          'footer-btn-left-login': target === 'login',
        }"
      >
        <PButton class="login-register-btn" :content="textInBtn" />
      </div>
    </div>
    <div class="line" />
    <div class="right">
      <slot name="right">
        Block
      </slot>
      <div
        class="footer-btn" :class="{
          'footer-btn-rwd-register': target === 'register',
          'footer-btn-rwd-login': target === 'login',
        }"
      >
        <PButton class="login-register-btn" :content="textInBtn" />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.login-container {
  background-color: var(--white-color);
  width: 80%;
  max-width: 60rem;
  border-radius: 2rem;
  border: 1px solid var(--main-color);
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1rem 2rem;
  flex-wrap: wrap;
  margin-top: 4rem;
  margin-bottom: 4rem;
  position: relative;

  .login-left {
    display: flex;
    flex-direction: column;

    .title-container {
      width: 100%;
      display: flex;
      align-items: center;
      .title {
        display: inline-block;
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--main-color);

        &::after {
          content: '';
          display: block;
          width: 120%;
          height: 0.22rem;
          background-color: var(--main-color);
          margin-top: 0.5rem;
        }
      }

      .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1%;
        background-color: var(--main-product-color);
        color: var(--white-color);
        border: none;
        outline: none;
        border-radius: 2rem;
        height: 1.8rem;
        padding: 0 1rem;
        box-shadow: 1px 1px 2px 1px rgba($color: #000000, $alpha: 0.2);
        cursor: pointer;
        margin-left: 10%;
        transition: all 0.2s;
        text-decoration: none;

        &:hover {
          background-color: var(--match-color);
        }
      }

    }

    .mail-password-block {
      margin-top: 2rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .mail, .password {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .sub-title {
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--text-color);
      }

      .sub-input {
        width: 80%;
        height: 1.8rem;
        border: 1px solid var(--main-color);
        outline: none;
        padding-left: 0.5rem;
      }
    }

    .footer-btn {
      width: 100%;
      justify-content: center;
      align-items: center;
      margin-top: 4rem;
      margin-bottom: 2rem;

      .login-register-btn {
        width: 50%;
      }
    }
  }

  .line {
      content: '';
      position: absolute;
      width: 0.1rem;
      height: 70%;
      bottom: 10%;
      left: 58%;
      background-color: var(--main-color);
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }

}

.btn-container {
  width: 40%;
  font-size: 1rem;
}

@media screen and (min-width: 821px) {

  .login-left {
    width: 56%;
    align-items: flex-start;

    .title-container {
      justify-content: start;
    }
  }

  .footer-btn {
    display: flex;

  }
  .right {
    width: 35%;
  }

  .footer-btn-rwd-login {
    display: none;
  }
  .footer-btn-rwd-register {
    display: none;
  }
}

@media screen and (max-width: 820px) {

  .login-container {
    padding-top: 2rem;
    width: 96%;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .line {
    display: none;
  }

  .footer-btn-left-register {
    display: none;
  }

  .login-left {
    width: 100%;
    align-items: center;

    .title-container {
      justify-content: center;
    }

    .mail, .password {
      align-items: center;

      .sub-title {
        width: 80%;
      }
    }

    .footer-btn-left-login {
        display: flex;
        width: 100%;
        justify-content: center;
      }
  }

  .right {
    width: 100%;
    margin-bottom: 2rem;
  }

  .footer-btn-rwd-register {
    display: flex;
    width: 80%;
    justify-content: center;
    margin-top: 2rem;
  }

  .footer-btn-rwd-login {
    display: none;
  }
}
</style>
