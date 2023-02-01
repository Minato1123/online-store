<script setup lang="ts">
import { type GetCurrentUserResponseData, getCurrentUser } from '@/api/users/getCurrentUser'
import { useLoginStatusUpdatedEventBus } from '@/composables/useLoginStatusUpdatedEventBus'
import router from '@/router'
import { useUsersStore } from '@/stores/user'

defineProps({
  isOpenMenu: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['closeMenu'])
const { userLogout } = useUsersStore()
const { userId, isLoggedIn } = storeToRefs(useUsersStore())

const { on: onLoginStatusUpdated } = useLoginStatusUpdatedEventBus()
const user = ref<GetCurrentUserResponseData | null>()

async function fetchCurrentUser() {
  if (isLoggedIn.value)
    user.value = (await getCurrentUser({ id: userId.value })).data
  else
    user.value = null
}

onMounted(async () => {
  await fetchCurrentUser()
})

onLoginStatusUpdated(async () => {
  await fetchCurrentUser()
})

function handleMenuBtnClick(target: string) {
  if (isLoggedIn.value) {
    router.push({
      name: target,
    })
  }
  else {
    router.push({
      name: 'login',
    })
  }
  emit('closeMenu')
}
</script>

<template>
  <div
    class="mask" :class="{
      'invisible-mask': !isOpenMenu,
    }"
    @click.self="$emit('closeMenu')"
  >
    <div
      class="menu-block" :class="{
        'visible-menu': isOpenMenu,
        'invisible-menu': !isOpenMenu,
      }"
    >
      <div class="user-container">
        <div v-if="user != null" class="user-name">
          嗨，{{ user.name }}！
        </div>
        <button
          v-if="!isLoggedIn" class="log-btn" @click="$router.push({
            name: 'login',
          })"
          @click.self="$emit('closeMenu')"
        >
          登入
        </button>
        <button v-else class="log-btn" @click="userLogout" @click.self="$emit('closeMenu')">
          登出
        </button>
      </div>
      <ul class="about-container">
        <li>
          <button
            @click="handleMenuBtnClick('profile')"
          >
            我的帳戶
          </button>
        </li>
        <li>
          <button
            @click="handleMenuBtnClick('following')"
          >
            追蹤清單
          </button>
        </li>
        <li><button>關於帕恰</button></li>
        <li><button>客服中心</button></li>
      </ul>
      <div class="contact-container">
        <div>關注我</div>
        <div class="contact-btns">
          <a class="contact-icon" href="https://github.com/Minato1123" target="_blank"><icon-radix-icons-github-logo /></a>
          <a class="contact-icon" href="https://www.instagram.com/carrie16_/" target="_blank"><icon-ion-logo-instagram /></a>
          <a class="contact-icon" href="https://twitter.com/minato23_" target="_blank"><icon-ion-logo-twitter /></a>
          <a class="contact-icon" href="https://www.linkedin.com/in/minato1123/" target="_blank"><icon-carbon-logo-linkedin /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 3rem;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 2;

  &.invisible-mask {
    visibility: hidden;
  }

}
  .menu-block {
    width: clamp(15rem, 30vw, 30rem);
    height: 100vh;
    background-color: rgba($color: #fff, $alpha: 0.95);
    border-right: solid 0.1rem var(--main-product-color);
    position: fixed;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    padding: 1rem;

    &.visible-menu {
      transform: translateX(0%);
      transition: all 0.3s ease 0s;
    }

    &.invisible-menu {
      visibility: hidden;
      transform: translateX(-100%);
      transition: all 0.3s ease 0s;
    }

    .user-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: solid 0.1rem var(--main-product-color);
      padding-bottom: 0.8rem;

      .user-name {
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--main-product-color);
        padding-left: 0.5rem;
      }

      .log-btn {
        color: var(--match-color);

        &:hover {
            color: var(--text-color);
          }
      }

    }

    .about-container {
      width: 100%;
      border-bottom: solid 0.1rem var(--main-product-color);
      padding-top: 1rem;
      padding-bottom: 1rem;

      li {
        font-size: 1.2rem;
        padding-left: 0.5rem;

        a, button {
          text-decoration: none;
          display: block;
          color: var(--text-color);
          width: 100%;
          text-align: left;
          padding-left: 0;
          padding-top: 0.8rem;
          padding-bottom: 0.8rem;

          &:hover {
            color: var(--match-color);
          }
        }

      }
    }

    .contact-container {
      color: var(--text-color);
      font-size: 1.2rem;
      margin-bottom: 1rem;
      padding-left: 0.5rem;
      padding-top: 1rem;

      .contact-btns {
        display: flex;
        justify-content: start;
        gap: 1.5rem;
        margin-top: 1rem;

        .contact-icon {
          color: var(--main-product-color);

          .svg-icon {
            width: 2rem;
            height: 2rem;
          }

          &:hover {
            color: var(--match-color);
          }
        }
      }
    }
  }

  ul, li {
    list-style-type: none;
    padding-left: 0;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  @media screen and (min-width: 1090px) { // 769px
    .menu-block {
      display: none;
  }
  }
</style>
