<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router'
import SearchBarMobile from '@/components/SearchBarMobile.vue'
import { getTotalNumOfProductFromCartByUserId } from '@/api/cartItems/getTotalNumOfProductsFromCartByUserId'
import { useCartUpdatedEventBus } from '@/composables/useCartUpdatedEventBus'
import { getCurrentUser } from '@/api/users/getCurrentUser'
import type { GetCurrentUserResponseData } from '@/api/users/getCurrentUser'
import { useUsersStore } from '@/stores/user'
import { useLoginStatusUpdatedEventBus } from '@/composables/useLoginStatusUpdatedEventBus'
import router from '@/router'
import { useCartStore } from '@/stores/shoppingCart'
import type { Ref } from 'vue'

defineEmits(['toggleMenu'])

const { on: onCartUpdated } = useCartUpdatedEventBus()
const { on: onLoginStatusUpdated } = useLoginStatusUpdatedEventBus()
const totalNumOfCartItems = ref<number>(0)
const { userId, isLoggedIn } = storeToRefs(useUsersStore())
const { userLogout } = useUsersStore()
const { numOfLocalCart } = storeToRefs(useCartStore())
const user = ref<GetCurrentUserResponseData | null>()

async function fetchTotalNumOfProductsFromCartByUserId() {
  if (user.value == null)
    totalNumOfCartItems.value = numOfLocalCart.value
  else
    totalNumOfCartItems.value = await (await getTotalNumOfProductFromCartByUserId({ userId: user.value.id })).data.numOfCartItems
}

async function fetchCurrentUser() {
  if (isLoggedIn.value)
    user.value = (await getCurrentUser({ id: userId.value })).data
  else
    user.value = null
}

async function logout() {
  await userLogout()
  user.value = null
}

onMounted(async () => {
  await fetchCurrentUser()
  fetchTotalNumOfProductsFromCartByUserId()
})

onCartUpdated(() => {
  fetchTotalNumOfProductsFromCartByUserId()
})

onLoginStatusUpdated(async () => {
  await fetchCurrentUser()
  fetchTotalNumOfProductsFromCartByUserId()
})

const isOpenSearchBar = ref(false)

const userPageRoute = computed<RouteLocationRaw>(() => {
  if (user.value != null)
    return { name: 'profile' }

  else
    return { name: 'login' }
})

const searchBtnRef: Ref<HTMLElement | null> = ref(null)
const searchText = ref<string>('')
function handleSearch() {
  searchText.value = searchText.value.trim()
  if (searchText.value === '')
    return
  router.push({ name: 'search', query: { keyword: searchText.value } })
}

function handleEnter(e: KeyboardEvent) {
  if (!e.isComposing)
    handleSearch()
}
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
        <input v-model="searchText" type="text" placeholder="Search..." @keydown.enter="handleEnter">
        <button @click="handleSearch">
          <icon-ic-baseline-search />
        </button>
      </div>
      <div class="nav-btns">
        <VDropdown theme="nav-tooltip">
          <button class="btn-bell">
            <icon-mdi-bell-outline />
          </button>
          <template #popper>
            <div>
              新消息！
            </div>
          </template>
        </VDropdown>
        <VDropdown theme="nav-tooltip">
          <button>
            <RouterLink
              :to="userPageRoute"
            >
              <icon-teenyicons-user-circle-solid />
            </RouterLink>
          </button>
          <template #popper>
            <div v-if="user == null" class="hello-user">
              尚未登入！
            </div>
            <div v-else>
              <div v-if="user.name != null" class="hello-user line">
                哈囉，{{ user.name }}！
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
                <button @click="logout">
                  <RouterLink
                    class="btn" :to="{
                      name: 'home',
                    }"
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
          <div v-if="totalNumOfCartItems > 0" class="num-of-cart">
            {{ totalNumOfCartItems }}
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
