<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router'
import SearchBarMobile from '@/components/SearchBarMobile.vue'
import { useUsersStore } from '@/stores/user'
import { useShoppingCartStore } from '@/stores/shoppingCart'

defineEmits(['toggleMenu'])

const { getLoginStatus, getCurrentUser, userLogout } = useUsersStore()
const { getNumOfCartProducts } = useShoppingCartStore()
const currentUser = computed(() => {
  const user = getCurrentUser()
  if (user != null)
    return user
  return null
})

const isOpenSearchBar = ref(false)

const loginStatus = computed(() => {
  return getLoginStatus()
})

const userPageRoute = computed<RouteLocationRaw>(() => {
  if (loginStatus.value === true)
    return { name: 'profile' }

  else
    return { name: 'login' }
})

const searchBtnRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div>
    <SearchBarMobile v-if="searchBtnRef != null" :search-btn-el="searchBtnRef" :is-open-search-bar="isOpenSearchBar" @close-search-bar="isOpenSearchBar = false" />

    <div class="nav-container">
      <div class="nav-rwd">
        <button @click="$emit('toggleMenu')">
          <icon-ph-list-bold />
        </button>
        <button ref="searchBtnRef" @click="isOpenSearchBar = !isOpenSearchBar">
          <icon-ic-baseline-search />
        </button>
      </div>
      <RouterLink :to="{ name: 'home' }" class="store-title">
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
        <VDropdown theme="login-tooltip">
          <button>
            <RouterLink
              :to="userPageRoute"
            >
              <icon-teenyicons-user-circle-solid />
            </RouterLink>
          </button>
          <template #popper>
            <div v-if="!loginStatus" class="hello-user">
              尚未登入！
            </div>
            <div v-else>
              <div v-if="currentUser != null" class="hello-user line">
                哈囉，{{ currentUser.name }}！
              </div>
              <div class="user-btns">
                <button>
                  <RouterLink
                    class="btn" :to="{
                      name: 'profile',
                    }"
                  >
                    我的帳戶
                  </RouterLink>
                </button>
                <button>
                  <RouterLink
                    class="btn" :to="{
                      name: 'following',
                    }"
                  >
                    追蹤清單
                  </RouterLink>
                </button>
                <button>
                  <RouterLink
                    class="btn" :to="{
                      name: 'home',
                    }" @click="userLogout"
                  >
                    登出
                  </RouterLink>
                </button>
              </div>
            </div>
          </template>
        </VDropdown>
        <button class="cart-btn">
          <RouterLink
            :to="{
              name: 'cart',
            }"
          >
            <icon-ph-shopping-cart-simple-bold />
          </RouterLink>
          <div v-if="getNumOfCartProducts() > 0" class="num-of-cart">
            {{ getNumOfCartProducts() }}
          </div>
        </button>
      </div>
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

.hello-user {
  font-size: 1.1rem;
  font-weight: 400;
  padding: 0 0.5rem 0.5rem 0.5rem;

  &.line {
    border-bottom: 1px solid var(--main-product-color);
  }
}

.user-btns {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0.5rem;

  button {
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    justify-content: start;
    align-items: center;
    transition: all 0.2s;

    &:hover {
      padding-left: 0.5rem;
      border-left: 3px solid var(--main-color);
    }

    .btn {
      text-decoration: none;
      color: var(--main-color);

    }
  }
}
.nav-container {
  position: relative;
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

  .cart-btn {
    position: relative;

    .num-of-cart {
      position: absolute;
      background-color: var(--match-color);
      color: var(--white-color);
      top: -0.3rem;
      right: -0.3rem;
      border-radius: 3rem;
      padding: 0.22rem;
      height: 0.8rem;
      width: 0.8rem;
      font-size: 0.45rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

}
.svg-icon {
  color: var(--white-color);
  width: 2rem;
  height: 2rem;
}

@media screen and (min-width: 1090px) {
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
