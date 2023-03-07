import { defineStore } from 'pinia'
import { StorageSerializers } from '@vueuse/core'
import { useForm } from 'vee-validate'
import router from '@/router'
import { useCartStore } from '@/stores/shoppingCart'
import { logout } from '@/api/login/logout'
import { useLoginStatusUpdatedEventBus } from '@/composables/useLoginStatusUpdatedEventBus'
import { login, type loginResponseData } from '@/api/login/login'
import { type AddUserRequestData, addUser } from '@/api/users/addUser'

export const useUsersStore = defineStore('users', () => {
  const { updateLocalCartToDB } = useCartStore()
  const userToken = useLocalStorage<string>('user-token', null, { serializer: StorageSerializers.string })
  const userId = useLocalStorage<number>('user-id', null, { serializer: StorageSerializers.number })

  const hasErrorInLogin = ref(false)
  const { emit: emitLoginStatusUpdated } = useLoginStatusUpdatedEventBus()
  const userData = ref<loginResponseData>()

  const loginSchema = {
    email(value: string) {
      if (!value)
        return '請輸入電子信箱'

      if (value.includes(' '))
        return '信箱不可包含空白'

      if (!value.includes('@') || !value.includes('.'))
        return '請輸入正確的電子信箱'

      return true
    },
    password(value: string) {
      if (!value)
        return '請輸入密碼'

      if (value.includes(' '))
        return '密碼不可包含空白'

      if (value.length < 8)
        return '密碼長度至少為 8 個字元'

      if (!value.match(/[a-z]/))
        return '密碼至少包含一個小寫字母'

      if (!value.match(/[0-9]/))
        return '密碼至少包含一個數字'

      return true
    },
  }

  const registerSchema = {
    email(value: string) {
      if (!value)
        return '請輸入電子信箱'

      if (value.includes(' '))
        return '信箱不可包含空白'

      if (!value.includes('@') || !value.includes('.'))
        return '請輸入正確的電子信箱'

      return true
    },
    password(value: string) {
      if (!value)
        return '請輸入密碼'

      if (value.includes(' '))
        return '密碼不可包含空白'

      if (value.length < 8)
        return '密碼長度至少為 8 個字元'

      if (!value.match(/[a-z]/))
        return '密碼至少包含一個小寫字母'

      if (!value.match(/[0-9]/))
        return '密碼至少包含一個數字'

      return true
    },
    name(value: string) {
      if (!value || value.trim() === '')
        return '請輸入姓名'

      return true
    },
    birthday(value: string) {
      if (!value)
        return '請輸入生日'

      return true
    },
    mobile(value: string) {
      if (!value)
        return '請輸入手機號碼'

      if (value.includes(' '))
        return '手機號碼不可包含空白'

      if (!value.match(/^[0-9]+$/))
        return '手機號碼只能包含數字'

      if (value.length !== 10)
        return '手機號碼長度為 10 個字元'

      return true
    },
  }

  const { errors: loginErrors, useFieldModel: useLoginFieldModel, handleSubmit: handleLoginSubmit } = useForm({
    validationSchema: loginSchema,
  })

  const [loginEmail, loginPassword] = useLoginFieldModel(['email', 'password'])

  const handleLogin = handleLoginSubmit(async (values) => {
    try {
      userData.value = (await login({
        email: values.email,
        password: values.password,
      })).data
      userToken.value = userData.value.token
      userId.value = userData.value.userId

      await nextTick()
      emitLoginStatusUpdated()
      await updateLocalCartToDB(userId.value)
      router.replace({ name: 'home' })
    }
    catch (error) {
      hasErrorInLogin.value = true
    }
  })

  const { errors: registerErrors, useFieldModel: useRegisterFieldModel, handleSubmit: handleRegisterSubmit, resetForm } = useForm({
    validationSchema: registerSchema,
  })

  const [registerEmail, registerPassword, registerName, registerBirthday, registerMobile] = useRegisterFieldModel(['email', 'password', 'name', 'birthday', 'mobile'])

  const handleRegister = handleRegisterSubmit(async (values, { resetForm }) => {
    const newUser: AddUserRequestData = {
      name: values.name,
      email: values.email,
      password: values.password,
      birthday: values.birthday,
      mobile: values.mobile,
    }

    try {
      await addUser(newUser)
      router.replace({ name: 'login' })

      resetForm({
        values: {
          email: '',
          password: '',
          name: '',
          birthday: '',
          mobile: '',
        },
      })
    }
    catch (error) {
      hasErrorInLogin.value = true
    }
  })

  const isLoggedIn = computed(() => {
    if (userId.value == null || userToken.value == null)
      return false
    return true
  })

  async function userLogout(): Promise<void> {
    await logout()
    userToken.value = null
    userId.value = null
    emitLoginStatusUpdated()
    router.replace({ name: 'home' })
  }

  function forcedLogout() {
    userToken.value = null
    userId.value = null
    emitLoginStatusUpdated()
    router.replace({ name: 'login' })
  }

  return {
    userToken,
    userId,
    hasErrorInLogin,
    handleLogin,
    loginErrors,
    loginEmail,
    loginPassword,
    handleRegister,
    registerErrors,
    registerEmail,
    registerPassword,
    registerName,
    registerBirthday,
    registerMobile,
    resetForm,
    isLoggedIn,
    userLogout,
    forcedLogout,
  }
})
