import { defineStore } from 'pinia'
import { useForm } from 'vee-validate'
import { useUsersStore } from '@/stores/user'
import type { User } from '@/types/index'

const { hasUser, addUser } = useUsersStore()

const schema = {
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

export const useRegisterStore = defineStore('register', () => {
  const { errors, useFieldModel, handleSubmit, resetForm } = useForm({
    validationSchema: schema,
  })

  const [email, password, name, birthday, mobile] = useFieldModel(['email', 'password', 'name', 'birthday', 'mobile'])

  const register = handleSubmit((values, { resetForm }) => {
    // send values to API
    if (hasUser(values.email)) {
      alert('此帳號已註冊')
    }
    else {
      const newUser: User = {
        id: -1,
        name: values.name,
        email: values.email,
        password: values.password,
        birthday: values.birthday,
        mobile: values.mobile,
      }
      addUser(newUser)
      alert('註冊成功')
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
  })

  return {
    errors,
    name,
    email,
    password,
    birthday,
    mobile,
    register,
    resetForm,
  }
})
