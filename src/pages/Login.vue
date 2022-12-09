<script lang="ts" setup>
import PLoginLayout from '@/components/PLoginLayout.vue'

const textInBtnLogin = {
  text: '登入',
  color: 'main-color',
}

const pageContent = ref('login')
const pathForRegister = '/register'

const accountRemember = ref(false)
</script>

<template>
  <PLoginLayout :text-in-btn="textInBtnLogin" :path="pathForRegister" :target="pageContent">
    <template #title>
      會員登入
    </template>
    <template #login-btn>
      <icon-ri-user-add-fill />
      <p class="login-btn-text">
        註冊
      </p>
    </template>
    <template #email>
      電子信箱
    </template>
    <template #password>
      密碼
    </template>
    <template #login-else>
      <div class="account-setup">
        <label class="remember-password">
          <input v-model="accountRemember" class="hidden" type="checkbox">
          <icon-material-symbols-check-box-outline v-if="accountRemember" />
          <icon-material-symbols-check-box-outline-blank v-else />
          記住我
        </label>
        <div>
          <RouterLink class="forget-password" to="/">
            忘記密碼？
          </RouterLink>
        </div>
      </div>
    </template>
    <template #right>
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
    </template>
  </PLoginLayout>
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
</style>
