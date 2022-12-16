<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'

const userCreditCards = ref([
  {
    name: '台新國際商業銀行 A',
    number: '*5678',
  },
  {
    name: '台新國際商業銀行 B',
    number: '*8765',
  },
])

const userAccounts = ref([
  {
    name: '中華信託商業銀行',
    number: '*6733',
  },
  {
    name: '中華信託商業銀行',
    number: '*6259',
  },
  {
    name: '中華信託商業銀行',
    number: '*9489',
  },

])
</script>

<template>
  <PUserLayout>
    <div class="payment-container">
      <div class="main-block">
        <div class="credit-card-block block">
          <div class="subtitle">
            信用卡 / 金融卡
          </div>
          <div class="credit-card-content content">
            <div v-for="(card, i) in userCreditCards" :key="`card-${i + 1}`" class="item">
              <div>{{ i + 1 }}</div>
              <div class="item-name">
                {{ card.name }}
              </div>
              <div class="item-number">
                {{ card.number }}
              </div>
            </div>
            <div class="add-btn-container">
              <button class="add-btn">
                <icon-material-symbols-add />新增信用卡
              </button>
            </div>
          </div>
        </div>
        <div class="bank-block block">
          <div class="subtitle">
            銀行帳號
          </div>
          <div class="bank-content content">
            <div v-for="(account, i) in userAccounts" :key="`account-${i + 1}`" class="item">
              <div>{{ i + 1 }}</div>
              <div class="item-name">
                {{ account.name }}
              </div>
              <div class="item-number">
                {{ account.number }}
              </div>
            </div>
            <div class="add-btn-container">
              <button class="add-btn">
                <icon-material-symbols-add />新增銀行帳號
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PUserLayout>
</template>

<style lang="scss" scoped>
  .payment-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 2rem;

    .main-block {
      overflow-y: scroll;
      .block {
        margin-bottom: 2rem;

        .subtitle {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;

          .item {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            padding: 0.8rem 0;
            transition: all 0.2s;
            color: var(--text-color);

            &:hover {
              color: var(--main-product-color);
              opacity: 0.8;
            }
          }
          .add-btn-container {
            width: 100%;
            display: flex;
            justify-content: center;
            .add-btn {
              background: transparent;
              background-color: var(--main-color);
              border-radius: 5rem;
              border: none;
              outline: none;
              color: var(--white-color);
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0.3rem 0;
              margin-top: 1rem;
              transition: all 0.2s;
              box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);

              &:hover {
                opacity: 0.8;
                cursor: pointer;
              }
            }
          }

        }
      }
    }
  }

  @media screen and (min-width: 541px) {
    .add-btn {
        width: 50%;
      }
  }

  @media screen and (max-width: 540px) {
    .payment-container {
      padding: 2rem 1rem;

      .add-btn {
        width: 100%;
      }
    }
  }
</style>
