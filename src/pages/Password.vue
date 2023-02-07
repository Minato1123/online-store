<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'
import PButton from '@/components/PButton.vue'
import InfoDialog from '@/components/InfoDialog.vue'
import IconCheckCircleRounded from '~icons/material-symbols/check-circle-rounded'
import IconCrossCircle from '~icons/gridicons/cross-circle'
import { updateUserPasswordData } from '@/api/users/updateUserPassword'
import { useUsersStore } from '@/stores/user'

const isDialogOpen = ref(false)
const isSaveSuccess = ref(true)
const { userId } = storeToRefs(useUsersStore())

const saveBtnContent = {
  text: '儲存',
  color: 'main-color',
}

const saveBtnSuccessDialog = {
  iconBeforeText: IconCheckCircleRounded,
  text: '儲存成功！',
  color: 'main-color',
  borderColor: 'main-color',
  textInBtnOK: {
    text: '確定',
    color: 'match-color',
  },
}

const saveBtnFailDialog = {
  iconBeforeText: IconCrossCircle,
  text: '儲存失敗！',
  additionalText: '請稍後再試一次',
  color: 'main-product-color',
  borderColor: 'main-product-color',
  textInBtnOK: {
    text: '確定',
    color: 'main-product-color',
  },
}

const oldPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmNewPassword = ref<string>('')

async function updatePassword() {
  if (newPassword.value !== confirmNewPassword.value) {
    isSaveSuccess.value = false
    return
  }
  await updateUserPasswordData({
    id: userId.value,
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
  })
  isSaveSuccess.value = true
  oldPassword.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
}
</script>

<template>
  <PUserLayout>
    <form class="pw-container" @submit.prevent="updatePassword">
      <div class="outer-block">
        <div class="pw-blocks">
          <div class="pw-block">
            <div class="subtitle">
              目前的密碼
              <button class="forget-pw-btn">
                忘記密碼？
              </button>
            </div>
            <input v-model="oldPassword" type="password" autocomplete="off">
          </div>
          <div class="pw-block">
            <div class="subtitle">
              新密碼
            </div>
            <input v-model="newPassword" type="password" autocomplete="off">
          </div>
          <div class="pw-block">
            <div class="subtitle">
              確認新密碼
            </div>
            <input v-model="confirmNewPassword" type="password" autocomplete="off">
          </div>
        </div>
      </div>
      <div class="save-btn-block">
        <PButton class="save-btn" :content="saveBtnContent" @click="isDialogOpen = true" />
      </div>
    </form>
  </PUserLayout>
  <InfoDialog v-if="isDialogOpen && isSaveSuccess" :text-in-dialog="saveBtnSuccessDialog" @close-info-dialog="isDialogOpen = false" />
  <InfoDialog v-if="isDialogOpen && !isSaveSuccess" :text-in-dialog="saveBtnFailDialog" @close-info-dialog="isDialogOpen = false" />
</template>

<style lang="scss" scoped>
  .pw-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    gap: 5rem;

    .outer-block {
      display: flex;

      .pw-blocks {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

    }

    .pw-block {
      display: flex;
      flex-direction: column;

      .subtitle {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--text-color);
        margin-bottom: 0.5rem;

        .forget-pw-btn {
          font-size: 0.9rem;
          outline: none;
          border: none;
          background-color: transparent;
          text-decoration: underline;
          color: var(--main-color);
          height: 1.2rem;
          padding: 1rem;
          margin-top: 1rem;
          box-sizing: content-box;
          cursor: pointer;
        }
      }

      input {
        width: 100%;
        height: 2rem;
        border: 1px solid var(--main-color);
        outline: none;
        padding-left: 0.5rem;
        box-sizing: border-box;
      }
    }

    .save-btn-block {
      display: flex;
      justify-content: center;

      .save-btn {
        width: 50%;
      }
    }
  }

  @media screen and (min-width: 577px) {

    .pw-container {
      padding: 3rem;
    }
    .pw-blocks {
      width: clamp(10rem, 60%, 20rem);
    }
  }

  @media screen and (max-width: 576px) {

    .pw-container {
      padding: 1rem;
    }
    .pw-blocks {
      width: 100%;
    }
  }
</style>
