<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useUsersStore } from '@/stores/user'
import PButton from '@/components/PButton.vue'
import InfoDialog from '@/components/InfoDialog.vue'
import type { BtnType, InfoType } from '@/types/index'

const textInBtnRegister: BtnType = {
  text: '註冊',
  color: 'main-color',
}

const textInRegisterFailDialog: InfoType = {
  text: '註冊失敗！',
  additionalText: '此信箱已被使用過。',
  color: 'main-product-color',
  borderColor: 'main-product-color',
  textInBtnOK: {
    text: '確認',
    color: 'main-product-color',
  },
}

const { handleRegister } = useUsersStore()
const { hasErrorInLogin, registerErrors, registerEmail, registerPassword, registerName, registerBirthday, registerMobile } = storeToRefs(useUsersStore())
</script>

<template>
  <form class="login-container" @submit="handleRegister">
    <div class="login-left">
      <div class="title-container">
        <div class="title">
          會員註冊
        </div>
        <RouterLink
          :to="{
            name: 'login',
          }" class="login-btn"
        >
          <icon-ri-user-follow-fill />
          <p class="register-btn-text">
            已有帳號登入
          </p>
        </RouterLink>
      </div>
      <div class="mail-password-block">
        <div class="mail">
          <div class="sub-title">
            <span class="required-star">*</span>電子信箱
          </div>
          <input
            v-model="registerEmail" v-tooltip.top-end="{
              content: registerErrors.email,
              theme: 'register-validate-tooltip',
              shown: registerErrors.email,
            }" name="email" class="sub-input" type="text"
          >
        </div>
        <div class="password">
          <div class="sub-title">
            <span class="required-star">*</span>密碼
            <span class="notes">請包含數字及英文字母，八碼以上</span>
          </div>
          <input
            v-model="registerPassword" v-tooltip="{
              content: registerErrors.password,
              theme: 'register-validate-tooltip',
              shown: registerErrors.password,
            }" name="password" class="sub-input" type="password"
          >
        </div>
      </div>
      <slot name="login-else" />
      <div class="footer-btn footer-btn-left-register">
        <PButton class="login-register-btn" :content="textInBtnRegister" />
      </div>
    </div>
    <div class="line" />
    <div class="right">
      <div class="else-input-block space-top">
        <div class="else-input-title">
          <span class="required-star">*</span>姓名
        </div>
        <input
          v-model="registerName" v-tooltip="{
            content: registerErrors.name,
            theme: 'register-validate-tooltip',
            shown: registerErrors.name,
          }" name="name" class="else-input" type="text"
        >
      </div>
      <div class="else-input-block">
        <div class="else-input-title">
          <span class="required-star">*</span>生日
        </div>
        <input
          v-model="registerBirthday" v-tooltip="{
            content: registerErrors.birthday,
            theme: 'register-validate-tooltip',
            shown: registerErrors.birthday,
          }" name="birthday" class="else-input" type="date"
        >
      </div>
      <div class="else-input-block">
        <div class="else-input-title">
          <span class="required-star">*</span>電話
        </div>
        <input
          v-model="registerMobile" v-tooltip="{
            content: registerErrors.mobile,
            theme: 'register-validate-tooltip',
            shown: registerErrors.mobile,
          }" name="mobile" class="else-input" type="tel"
        >
      </div>
      <div
        class="footer-btn footer-btn-rwd-register"
      >
        <PButton class="login-register-btn" :content="textInBtnRegister" />
      </div>
    </div>
  </form>
  <Teleport to="body">
    <Transition>
      <InfoDialog v-if="hasErrorInLogin" :text-in-dialog="textInRegisterFailDialog" @close-info-dialog="hasErrorInLogin = false" />
    </Transition>
  </Teleport>
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

.login-container {
  background-color: var(--white-color);
  width: 80%;
  max-width: 60rem;
  max-height: 30rem;
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
