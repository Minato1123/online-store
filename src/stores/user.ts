import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { User } from '@/types/index'
import userList from '@/assets/json/users.json'

export const useUsersStore = defineStore('users', () => {
  const users: Ref<User[]> = ref(userList)

  function addUser(user: User) {
    const lastId = users.value[users.value.length - 1].id
    user.id = lastId + 1
    users.value.push(user)
  }

  function hasUser(email: string) {
    return users.value.some(user => user.email === email)
  }

  function loginVaild(email: string, password: string) {
    return users.value.some(user => user.email === email && user.password === password)
  }

  return { users, addUser, hasUser, loginVaild }
})
