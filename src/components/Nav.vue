<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUsersStore } from '@/stores/user'

defineEmits(['toggleMenu'])

const { getLoginStatus, getCurrentUser } = useUsersStore()
const loginStatus = getLoginStatus()
const currentUser = computed(() => {
  const user = getCurrentUser()
  if (user != null)
    return user
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
      <VDropdown theme="login-tooltip">
        <button>
          <RouterLink :to="toUrl">
            <icon-teenyicons-user-circle-solid />
          </RouterLink>
        </button>
        <template #popper>
          <div v-if="toUrl === '/login'" class="hello-user">
            尚未登入！
          </div>
          <div v-else>
            <div class="hello-user line">
              哈囉，{{ currentUser?.name }}！
            </div>
            <div class="user-btns">
              <button>
                <RouterLink class="btn" to="/user/profile">
                  我的帳戶
                </RouterLink>
              </button>
              <button>
                <RouterLink class="btn" to="/">
                  追蹤清單
                </RouterLink>
              </button>
              <button>
                <RouterLink class="btn" to="/">
                  登出
                </RouterLink>
              </button>
            </div>
          </div>
        </template>
      </VDropdown>
      <button>
        <RouterLink to="/cart">
          <icon-ph-shopping-cart-simple-bold />
        </RouterLink>
      </button>
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
