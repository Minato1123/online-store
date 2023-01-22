<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import PCheckoutLayout from '@/components/PCheckoutLayout.vue'
import PButton from '@/components/PButton.vue'
import IconShoppingBasketLine from '~icons/ri/shopping-basket-line'
import { type GetOrderByOrderIdResponseData, getOrderByOrderId } from '@/api/orders/getOrder'

const route = useRoute()
const orderId = computed(() => String(route.params.orderId))

const order = ref<GetOrderByOrderIdResponseData>()

async function fetchBoughtList() {
  order.value = (await getOrderByOrderId({ serialNumber: orderId.value })).data[0]
}

onMounted(() => {
  fetchBoughtList()
})

const textInGoShoppingBtn = {
  text: '繼續購物',
  color: 'match-color',
  afterTextIcon: IconShoppingBasketLine,
}
</script>

<template>
  <PCheckoutLayout v-slot="slotProps" target="completed" :order-id="orderId">
    <div class="container">
      <div class="detail">
        共 {{ slotProps.num }} 件商品｜總金額 NT$ {{ slotProps.total }}
      </div>
      <div class="data-container">
        <div v-if="order" class="orderer-data-container">
          <div class="title">
            個人資料
          </div>
          <div class="data-block">
            <div class="item">
              <div class="sub-title">
                姓名
              </div>
              <div class="sub-content">
                {{ order.name }}
              </div>
            </div>
            <div class="item">
              <div class="sub-title">
                電話
              </div>
              <div class="sub-content">
                {{ order.mobile }}
              </div>
            </div>
            <div class="item">
              <div class="sub-title">
                電子信箱
              </div>
              <div class="sub-content">
                {{ order.email }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="order" class="receive-info-container">
          <div class="title">
            收件資料
          </div>
          <div class="data-block">
            <div class="item">
              <div class="sub-title">
                宅配地址
              </div>
              <div class="sub-content">
                <span>{{ order.county }}</span>{{ order.address }}
              </div>
            </div>
            <div class="item">
              <div class="sub-title">
                付款狀態
              </div>
              <div class="sub-content">
                {{ order.paymentStatus }}
              </div>
            </div>
            <div class="item">
              <div class="sub-title">
                商品狀態
              </div>
              <div class="sub-content">
                {{ order.status }}
              </div>
            </div>
          </div>
        </div>
        <div class="complete-btn">
          <RouterLink
            class="btn" :to="{
              name: 'home',
            }"
          >
            <PButton :content="textInGoShoppingBtn" />
          </RouterLink>
        </div>
      </div>
    </div>
  </PCheckoutLayout>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin: 1rem 0 5rem 0;

  .detail {
    display: flex;
    justify-content: end;
    color: var(--text-color);
    letter-spacing: 1px;
    font-weight: 500;
  }

  .data-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    .orderer-data-container, .receive-info-container {

      .title {
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--main-product-color);
        margin-bottom: 2rem;
        position: relative;

        &::after {
        content: '';
        position: absolute;
        width: 6rem;
        height: 0.2rem;
        background-color: var(--main-product-color);
        bottom: -0.4rem;
        left: 0.3rem;
      }
    }

    .data-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;

      .item {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1rem;

        .sub-title {
          width: 25%;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--text-color);
        }

        .sub-content {
          width: 70%;
        }
      }
    }
  }

    .complete-btn {
      display: flex;
      align-items: flex-end;
      justify-content: end;

      .btn {
        text-decoration: none;
        width: 10rem;
      }
    }
  }
}

@media screen and (min-width: 1001px) {

    .orderer-data-container, .receive-info-container {
      width: 38%;
    }

    .complete-btn {
      width: 20%;
    }
}

@media screen and (max-width: 1000px) {
  .data-container {
    flex-direction: column;
    gap: 3rem;

    .orderer-data-container, .receive-info-container {
      width: 100%;
    }

    .complete-btn {
      width: 100%;
    }
  }
}
</style>
