import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { User } from '@/types/index'
import userList from '@/assets/json/users.json'

export const useUsersStore = defineStore('users', () => {
  const currentUser = useLocalStorage<User | null>('user', null, { serializer: StorageSerializers.object })
  const users = ref<User[]>(userList)

  function addUser(user: User): void {
    const lastId = users.value[users.value.length - 1].id
    user.id = lastId + 1
    users.value.push(user)
  }

  function hasUser(email: string): boolean {
    return users.value.some(user => user.email === email)
  }

  function isloginVaild(email: string, password: string): boolean {
    return users.value.some(user => user.email === email && user.password === password)
  }

  function getLoginStatus() {
    if (currentUser.value != null)
      return true

    else
      return false
  }

  function getUserByEmail(email: string): User | null {
    return users.value.find(user => user.email === email) ?? null
  }

  function userLogin(user: User): void {
    currentUser.value = user
  }

  function getCurrentUser(): User | null {
    if (currentUser.value != null)
      return currentUser.value
    else
      return null
  }

  function userLogout(): void {
    currentUser.value = null
  }

  return { users, addUser, hasUser, isloginVaild, getLoginStatus, getUserByEmail, userLogin, getCurrentUser, userLogout }
})
