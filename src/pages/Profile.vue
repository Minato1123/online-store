<script lang="ts" setup>
import PUserLayout from '@/components/PUserLayout.vue'
import PButton from '@/components/PButton.vue'
import InfoDialog from '@/components/InfoDialog.vue'
import { type GetCurrentUserResponseData, getCurrentUser } from '@/api/users/getCurrentUser'
import { updateUserData } from '@/api/users/updateUserData'
import IconCheckCircleRounded from '~icons/material-symbols/check-circle-rounded'
import IconCrossCircle from '~icons/gridicons/cross-circle'
import { useUsersStore } from '@/stores/user'

const { userId, isLoggedIn } = storeToRefs(useUsersStore())
const user = ref<GetCurrentUserResponseData>()
async function fetchCurrentUser() {
  if (!isLoggedIn.value)
    return
  user.value = (await getCurrentUser({ id: userId.value })).data
}

onMounted(() => {
  fetchCurrentUser()
})

const isDialogOpen = ref(false)
const isSaveSuccess = ref(true)

const editProfile = computed(() => {
  if (user.value == null)
    return
  return {
    name: user.value.name,
    birthday: user.value.birthday,
    email: user.value.email,
    mobile: user.value.mobile,
    address: user.value.address,
  }
})

async function submitUpdateProfile() {
  if (editProfile.value == null)
    return
  await updateUserData({
    id: userId.value,
    ...editProfile.value,
  })
  isSaveSuccess.value = true
  isDialogOpen.value = true
}

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
</script>

<template>
  <PUserLayout>
    <form class="profile-container" @submit.prevent="submitUpdateProfile">
      <div class="name-birthday-container">
        <div class="name-block">
          <div class="sub-title">
            姓名
          </div>
          <input v-if="editProfile" v-model="editProfile.name" type="text" class="name-input">
        </div>
        <div class="birthday-block">
          <div class="sub-title">
            生日
          </div>
          <input v-if="editProfile" v-model="editProfile.birthday" type="date" class="birthday-input">
        </div>
      </div>
      <div class="email-block">
        <div class="sub-title">
          電子信箱
        </div>
        <input v-if="editProfile" v-model="editProfile.email" type="email">
      </div>
      <div class="tel-block">
        <div class="sub-title">
          手機號碼
        </div>
        <input v-if="editProfile" v-model="editProfile.mobile" type="tel">
      </div>
      <div class="address-block">
        <div class="sub-title">
          送件地址
        </div>
        <input v-if="editProfile" v-model="editProfile.address" type="text">
      </div>
      <div class="save-button">
        <PButton class="save-btn" :content="saveBtnContent">
          儲存
        </PButton>
        <InfoDialog v-if="isDialogOpen && isSaveSuccess" :text-in-dialog="saveBtnSuccessDialog" @close-info-dialog="isDialogOpen = false" />
        <InfoDialog v-if="isDialogOpen && !isSaveSuccess" :text-in-dialog="saveBtnFailDialog" @close-info-dialog="isDialogOpen = false" />
      </div>
    </form>
  </PUserLayout>
</template>

<style lang="scss" scoped>
  .profile-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    gap: 5%;

    .sub-title {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    input {
      height: 2.2rem;
      border: 1px solid var(--main-color);
      outline: none;
      padding-left: 0.5rem;
      font-size: 1rem;
      box-sizing: border-box;
    }

    .name-birthday-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

    }

    .save-button {
      margin-top: 2rem;
      display: flex;
      justify-content: center;

      .save-btn {
        width: 50%;
      }
    }
  }

  @media screen and (max-width: 929px) {
    .birthday-block {
        margin-top: 1rem;
      }
  }

  @media screen and (min-width: 577px) {
    .profile-container {
      padding: 1rem 3rem;
    }

    input {
      width: 75%;
    }

    .name-birthday-container {
      gap: 10%;

      .name-block, .birthday-block {
        width: 40%;
        min-width: 14rem;
      }
    }
  }

  @media screen and (max-width: 576px) {

    .profile-container {
      padding: 1rem;
    }

    input {
      width: 100%;
    }

    .name-birthday-container {
      margin-top: 1rem;
      gap: 0;

      .name-block, .birthday-block {
        width: 100%;
      }
    }
    .email-block, .tel-block, .address-block {
      margin-top: 1rem;
    }

  }
</style>
