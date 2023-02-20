<script setup lang="ts">
import type { PropType } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import PButton from './PButton.vue'
import type { GetOrderSerialNumberByStatusResponseData } from '@/api/orders/getOrderSerialNumberByStatus'
import { type GetProductListFromBoughtByOrderIdResponseData, getProductListFromBoughtByOrderId } from '@/api/boughtItems/getProductListFromBoughtByOrderId'

const props = defineProps({
  order: {
    type: Object as PropType<GetOrderSerialNumberByStatusResponseData>,
    required: true,
  },
})

const emit = defineEmits(['closeDialog'])

const boughtItems = ref<GetProductListFromBoughtByOrderIdResponseData[]>()
const orderTime = computed(() => {
  const date = new Date(props.order.purchaseTime)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
})

const paymentTime = computed(() => {
  if (props.order.paymentStatus !== 'paid') {
    return '-'
  }
  else {
    const date = new Date(props.order.purchaseTime)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  }
})

const address = computed(() => {
  if (props.order.deliveryType === 'home-delivery')
    return `${props.order.county} ${props.order.address}`

  else
    return `${props.order.convenienceStoreData}`
})

const paymentMethod = {
  'credit-card': '信用卡／金融卡',
  'transfer': '銀行轉帳',
  'cash-on-delivery': '貨到付款',
}

const deliveryMethod = {
  'home-delivery': '宅配',
  'convenience-store': '超商取貨',
}

const textInBtnOK = {
  text: 'OK',
  color: 'main-color',
}

const textInBtnCancel = {
  text: '聯絡客服',
  color: 'main-product-color',
}

async function fetchBoughtItemsList() {
  boughtItems.value = (await getProductListFromBoughtByOrderId({ orderId: `${props.order.serialNumber}` })).data
}

onMounted(() => {
  fetchBoughtItemsList()
})

function closeDialog() {
  emit('closeDialog')
}

// 按 ESC 可以關閉快速購物車
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    closeDialog()
}, false)

const isBackgroundLocked = useScrollLock(window.document.body)

onMounted(() => {
  isBackgroundLocked.value = true
})

onBeforeUnmount(() => {
  isBackgroundLocked.value = false
})
</script>

<template>
  <Teleport to="body">
    <div class="mask">
      <OnClickOutside class="container" @trigger="closeDialog">
        <div class="serial-number">
          訂單編號 {{ props.order.serialNumber }}
        </div>
        <div class="content">
          <div class="order-detail">
            <div class="order-detail-column">
              <div>訂單時間｜{{ orderTime }}</div>
              <div>付款時間｜{{ paymentTime }}</div>
              <div>完成時間｜-</div>
            </div>
            <div class="order-detail-column">
              <div>訂購姓名｜{{ order.name }}</div>
              <div>聯絡電話｜{{ order.mobile }}</div>
              <div>電子信箱｜{{ order.email }}</div>
            </div>
          </div>
          <div class="order-methods">
            <div>付款方式｜{{ paymentMethod[order.paymentType] }}</div>
            <div>配送方式｜{{ deliveryMethod[order.deliveryType] }}：{{ address }}</div>
          </div>
          <div v-if="boughtItems" class="product-list-container">
            <div v-for="(item, i) in boughtItems" :key="`boughtItem-${i}`" class="product">
              <img class="product-img" :src="item.image">
              <div class="product-name">
                {{ item.name }}
              </div>
              <div>{{ item.specificationName }}</div>
              <div>{{ item.amount }}</div>
              <div>{{ item.price * item.amount }}</div>
            </div>
          </div>
        </div>
        <div class="btns">
          <PButton class="btn" :content="textInBtnCancel" @click="closeDialog" />
          <PButton class="btn" :content="textInBtnOK" @click="closeDialog" />
        </div>
      </OnClickOutside>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  .container {
    background-color: var(--white-color);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .serial-number {
      width: 100%;
      display: flex;
      justify-content: center;
      color: var(--main-color);
      font-size: 1.2rem;
    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow-y: auto;
    }

    .order-detail {
      margin: auto;
      width: 80%;
      display: flex;
      justify-content: space-between;
      color: var(--text-color);

      .order-detail-column {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    .order-methods {
      width: 80%;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: var(--text-color);
    }

    .product-list-container {
      width: 80%;
      margin: auto;
      .product {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .product-img {
          width: 5rem;
          height: 5rem;
          object-fit: cover;
        }

        .product-name {
          width: 40%;
          min-width: 10rem;
        }
      }
    }
    .btns {
      width: 80%;
      margin: auto;
      display: flex;
      justify-content: space-between;

      .btn {
        width: 45%;
      }
    }
  }
}

@media screen and (max-width: 840px) {
  .order-detail {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

@media screen and (min-width: 577px) {
  .mask {
    .container {
      width: 70%;
      border-radius: 2rem;
      border: 0.1rem solid var(--main-color);

      .product-list-container {
        max-height: 17rem;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .mask {
    .container {
      width: 100%;
      border-top: 0.1rem solid var(--main-color);
      border-bottom: 0.1rem solid var(--main-color);

      .product-list-container {
        width: 100%;
        max-height: 11rem;
      }
    }
  }
}
</style>
