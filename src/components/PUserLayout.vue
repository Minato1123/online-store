<script lang="ts" setup>
</script>

<template>
  <div class="user-container">
    <div class="user-sidebar">
      <button>
        <RouterLink
          class="user-sidebar-title" :class="{
            active: $route.name === 'profile',
          }" :to="{
            name: 'profile',
          }"
        >
          個人資訊
        </RouterLink>
      </button>
      <button>
        <RouterLink
          class="user-sidebar-title" :class="{
            active: $route.name === 'payment',
          }" :to="{ name: 'payment' }"
        >
          付款方式
        </RouterLink>
      </button>
      <button>
        <RouterLink
          class="user-sidebar-title" :class="{
            active: $route.name === 'password',
          }" :to="{ name: 'password' }"
        >
          更改密碼
        </RouterLink>
      </button>
      <button>
        <RouterLink
          class="user-sidebar-title" :class="{
            active: $route.name === 'purchaseList',
          }" :to="{ name: 'purchaseList' }"
        >
          訂單記錄
        </RouterLink>
      </button>
    </div>
    <div class="line" />
    <div class="user-content">
      <slot>
        各項內容
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-container {
    margin: 3rem 0;
    display: flex;
    width: 80%;
    height: 36rem;
    background-color: var(--white-color);

    .user-sidebar {
      width: 20%;
      display: flex;
      gap: 1rem;
      align-items: center;
      font-size: 1.3rem;

      button {
        width: 100%;
        outline: none;
        border: none;
        background: transparent;
        font-weight: 500;
      }

      .user-sidebar-title {
        text-align: center;
        opacity: 0.5;
        color: var(--main-color);
        text-decoration: none;

        &.active {
          opacity: 1;
        }

        &:hover {
          opacity: 1;
        }
      }
    }

    .user-content {
      overflow-y: auto;
      width: 80%;
    }
  }

  @media screen and (min-width: 577px) {
    .user-container {
      min-width: 36rem;
      border-radius: 2rem;
      border: 1px solid var(--main-color);
    }
    .user-sidebar {
      margin-top: 2rem;
      flex-direction: column;
    }

    .line {
      margin: auto 0;
      width: 1px;
      height: 32rem;
      background-color: var(--main-color);
    }
  }

  @media screen and (max-width: 576px) {
    .user-container {
      width: 100%;
      flex-direction: column;
      border-top: 1px solid var(--main-color);
      border-bottom: 1px solid var(--main-color);

      .user-sidebar {
        width: 100%;
        margin-top: 1rem;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding-bottom: 1rem;

        button {
          width: 48%;
        }

      }

      .line {
        display: none;
      }

      .user-content {
        width: 100%;
      }
    }
  }
</style>
