<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useUsersStore } from '@/stores/user'
import PButton from '@/components/PButton.vue'

const textInBtnLogin = {
  text: '登入',
  color: 'main-color',
}

const { rememberAccount, forgetAccount } = useUsersStore()
const { email, password } = storeToRefs(useUsersStore())

const { handleLogin } = useUsersStore()
const { loginErrors, loginEmail, loginPassword } = storeToRefs(useUsersStore())
const { email: rememberEmail, password: rememberPassword } = storeToRefs(useUsersStore())
if (rememberEmail.value != null && rememberPassword.value != null) {
  email.value = rememberEmail.value
  password.value = atob(rememberPassword.value)
}

const isRememberAccount = computed(() => {
  if (email.value == null || password.value == null)
    return false
  else
    return true
})

function toggleRemeberAccount() {
  if (!isRememberAccount.value)
    rememberAccount()

  else
    forgetAccount()
}

watch([loginEmail, loginPassword], () => {
  if (isRememberAccount.value)
    rememberAccount()
})
</script>

<template>
  <form class="login-container" @submit="handleLogin">
    <div class="login-left">
      <div class="title-container">
        <div class="title">
          會員登入
        </div>
        <RouterLink
          :to="{
            name: 'register',
          }" class="login-btn"
        >
          <icon-ri-user-add-fill />
          <p class="login-btn-text">
            註冊
          </p>
        </RouterLink>
      </div>
      <div class="mail-password-block">
        <div class="mail">
          <div class="sub-title">
            電子信箱
          </div>
          <input
            v-model="loginEmail" name="email" class="sub-input" type="text"
          >
        </div>
        <div class="password">
          <div class="sub-title">
            密碼
          </div>
          <input
            v-model="loginPassword" name="password" class="sub-input" type="password"
          >
        </div>
      </div>
      <div class="account-setup">
        <label class="remember-password" @click.self="toggleRemeberAccount">
          <input class="hidden" type="checkbox">
          <icon-material-symbols-check-box-outline v-if="isRememberAccount" />
          <icon-material-symbols-check-box-outline-blank v-else />
          記住我
        </label>
        <div>
          <RouterLink
            class="forget-password" :to="{
              name: 'home',
            }"
          >
            忘記密碼？
          </RouterLink>
        </div>
      </div>
      <div
        class="footer-btn footer-btn-left-login"
      >
        <PButton class="login-register-btn" :content="textInBtnLogin" />
      </div>
    </div>
    <div class="line" />
    <div class="right">
      <div class="quick-login">
        快速登入
      </div>
      <div class="quick-login-block">
        <button class="quick-login-btn">
          <icon-logos-google-icon />
          Google 登入
        </button>
        <button class="quick-login-btn">
          <icon-logos-facebook />
          Facebook 登入
        </button>
      </div>
      <div
        class="footer-btn footer-btn-rwd-login"
      >
        <PButton class="login-register-btn" :content="textInBtnLogin" />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.login-btn-text {
  margin: 0;
  display: inline-block;
  width: 70%;
}
.account-setup {
  margin-top: 1rem;
  width: 80%;
  display: flex;
  justify-content: space-between;

  .remember-password {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 50%;
    color: var(--text-color);
    cursor: pointer;

    .hidden {
      display: none;
    }

    .icon-svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  .forget-password {
    color: var(--main-color);
  }
}

.quick-login {
  color: var(--text-color);
  font-size: 1.2rem;
  font-weight: 500;
}
.quick-login-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .quick-login-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    background-color: var(--white-color);
    outline: none;
    border-radius: 2rem;
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 1px 1px 1px 1px rgba($color: #000000, $alpha: 0.1);

    .icon-svg {
      width: 2rem;
      height: 2rem;
    }

    &:hover {
      scale: 1.05;
    }
  }
}

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
