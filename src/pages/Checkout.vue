<script lang="ts" setup>
import PButton from '@/components/PButton.vue'
import PCheckoutLayout from '@/components/PCheckoutLayout.vue'
import router from '@/router'

const textInCheckoutBtn = {
  text: '確認結帳',
  color: 'main-product-color',
}

function handleSubmit() {
  router.push({ path: '/delivery' })
}
</script>

<template>
  <PCheckoutLayout target="checkout">
    <form class="container" @submit.prevent>
      <div class="accept-container">
        <div class="title">
          收件資料
          <button class="same-user-btn">
            <icon-material-symbols-check-box-outline-blank />同使用者資料
          </button>
        </div>
        <div class="data-block">
          <div class="data-item">
            <div>姓名</div>
            <input type="text">
          </div>
          <div class="data-item">
            <div>電話</div>
            <input type="text">
          </div>
          <div class="data-item">
            <div>電子信箱</div>
            <input type="text">
          </div>
        </div>
      </div>
      <div class="check-container">
        <button class="discount-btn">
          使用優惠代碼
        </button>
        <div class="detail">
          共幾件商品 | 總金額 NT$
        </div>
        <PButton class="check-btn" :content="textInCheckoutBtn" @click="handleSubmit" />
      </div>
    </form>
  </PCheckoutLayout>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 1rem;
  display: flex;
  margin: 2rem 0;
  box-sizing: border-box;

  .accept-container {
    width: 60%;

    .title {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--main-product-color);
      width: 100%;
      display: flex;
      justify-content: start;
      position: relative;
      margin-bottom: 1rem;

      &::after {
        content: '';
        position: absolute;
        width: 6rem;
        height: 0.2rem;
        background-color: var(--main-product-color);
        bottom: -0.4rem;
        left: 0.3rem;
      }

      .same-user-btn {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        background: transparent;
        outline: none;
        border: none;
        font-size: 0.8rem;
        gap: 0.2rem;
        color: var(--main-product-color);
        margin-left: 2rem;
        cursor: pointer;
      }
    }

    .data-block {
      display: flex;
      flex-direction: column;
      background-color: var(--white-color);
      width: 100%;
      padding: 1rem 1.5rem;
      box-sizing: border-box;

      .data-item {
        display: flex;
        padding: 1rem 0;
        height: 2rem;
        gap: 2rem;

        div {
          width: 20%;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--text-color);
        }

        input {
          width: 60%;
          border: 1px solid var(--main-color);
        }

      }
    }
  }

  .check-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: end;
    gap: 1rem;

    .discount-btn {
      background: transparent;
      border: none;
      outline: none;
      text-decoration: underline;
      color: var(--main-product-color);
      font-size: 0.8rem;
      cursor: pointer;

    }

    .detail {
      color: var(--text-color);
      letter-spacing: 1px;
      font-weight: 500;
    }

    .check-btn {
      width: 50%;
    }
  }
}

@media screen and (max-width: 835px) {
  .container {
    flex-direction: column;
    align-items: center;
    padding: 0;

    .accept-container {
      width: 100%;

      .title {
        padding-left: 2rem;

        &::after {
          left: 2.3rem;
        }
      }

      .data-block {
        padding: 0rem 1rem;

        .data-item {
          div {
            width: 30%;
          }
        }
      }
    }

    .check-container {
      width: 100%;
      margin-top: 1.5rem;
      align-items: center;
    }
  }
}

@media screen and (min-width: 548px) {
  .data-block {
    border: 1px solid var(--main-product-color);
  }
}

@media screen and (max-width: 547px) {
  .data-block {
    border-top: 1px solid var(--main-product-color);
    border-bottom: 1px solid var(--main-product-color);
  }
}
</style>
