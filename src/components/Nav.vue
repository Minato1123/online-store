<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUsersStore } from '@/stores/user'

defineEmits(['toggleMenu'])

const { getLoginStatus } = useUsersStore()
const loginStatus = getLoginStatus()
const loginStatusContent = computed(() => {
  if (loginStatus.value === true)
    return '<div>哈囉，帕恰！</div><button>我的帳戶</button><button>追蹤清單</button><button>登出</button>'

  else
    return '尚未登入！'
})
const tooltipTheme = computed(() => {
  if (loginStatus.value === true)
    return 'login-tooltip'

  else
    return 'unlogin-tooltip'
})

const toUrl = computed(() => {
  if (loginStatus.value === true)
    return '/user/profile'

  else
    return '/login'
})
</script>

<template>
  <div class="nav-container">
    <div class="nav-rwd">
      <button @click="$emit('toggleMenu')">
        <icon-ph-list-bold />
      </button>
      <button><icon-ic-baseline-search /></button>
    </div>
    <RouterLink to="/" class="store-title">
      <img class="store-logo" src="../assets/images/pochacco-logo.png" alt="pochacco online store's logo">
      <div class="store-name">
        帕恰購物
      </div>
    </RouterLink>
    <div class="search-bar">
      <input type="text" placeholder="Search...">
      <button><icon-ic-baseline-search /></button>
    </div>
    <div class="nav-btns">
      <button class="btn-bell">
        <icon-mdi-bell-outline />
      </button>
      <button
        v-tooltip="{
          content: loginStatusContent,
          theme: tooltipTheme,
          html: true,
        }"
      >
        <RouterLink :to="toUrl">
          <icon-teenyicons-user-circle-solid />
        </RouterLink>
      </button>
      <button><icon-ph-shopping-cart-simple-bold /></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
.nav-container {
  background-color: var(--main-color);
  height: 5rem;
  display: flex;
  align-items: center;

  .store-title {
    display: flex;
    text-decoration: none;
    flex-shrink: 0;

    img {
      width: 3.2rem;
    }
    .store-name {
      margin-left: 0.6rem;
      color: var(--white-color);
      font-family: 'Noto Sans TC', sans-serif;
      font-weight: 500;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.search-bar {
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 40%;
  height: 2rem;
  padding: 0.2rem 0.2rem 0.2rem 1rem;
  border-radius: 5rem;

  input {
    border: none;
    outline: none;
    height: 100%;
    flex-grow: 1;
  }

  button {
    background-color: var(--match-color);
    border: none;
    outline: none;
    width: 3rem;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 5rem 5rem 0;

    &:hover {
      background-color: var(--main-product-color);
    }

    .svg-icon {
      width: 1.5rem;
      height: 1.5rem;

    }
  }
}
.nav-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;

  .svg-icon:hover {
    cursor: pointer;
    color: var(--selected-color);
  }

}
.svg-icon {
  color: var(--white-color);
  width: 2rem;
  height: 2rem;
}

@media screen and (min-width: 1090px) { //768
  .nav-container {
    justify-content: space-around;

    .nav-rwd {
      display: none;
    }
  }
}

@media screen and (max-width: 1090px) {

  .nav-container {
    height: 3rem;
    justify-content: space-between;
    padding: 0 0.5rem;
    box-sizing: border-box;

    .nav-rwd {
      display: block;

      button {
        .svg-icon:hover {
          cursor: pointer;
          color: var(--selected-color);
  }
      }
    }

    .store-title {

    img {
      width: 2rem;
    }
    .store-name {
      font-size: 1.2rem;
    }
  }

  .nav-btns {
    width: 5rem;
  }
}

  .svg-icon {
    width: 1.6rem;
  height: 1.6rem;
  }
  .search-bar {
    display: none;
  }

  .btn-bell {
    display: none;
  }
}

@media screen and (max-width: 289px) {
  .nav-container {
    padding: 0;
  }
}
</style>
