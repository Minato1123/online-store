import { defineStore } from 'pinia'
import { useForm } from 'vee-validate'
import { useUsersStore } from '@/stores/user'

const { hasUser, loginVaild } = useUsersStore()

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
}

export const useLoginStore = defineStore('login', () => {
  const { errors, useFieldModel, handleSubmit } = useForm({
    validationSchema: schema,
  })

  const [email, password] = useFieldModel(['email', 'password'])

  const login = handleSubmit((values) => {
    if (loginVaild(values.email, values.password))
      alert('登入成功')

    else if (hasUser(values.email))
      alert('密碼錯誤')

    else
      alert('此帳號尚未註冊')
  })

  return {
    errors,
    email,
    password,
    login,
  }
})
