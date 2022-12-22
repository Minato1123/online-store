import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { User } from '@/types/index'
import userList from '@/assets/json/users.json'

export const useUsersStore = defineStore('users', () => {
  const userLoginStatus = useLocalStorage<boolean>('user-login-status', false)
  const users = ref<User[]>(userList)
  const currentUser = ref<User | undefined>(undefined)

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

  function changeLoginStatus(loginChange: boolean): void {
    userLoginStatus.value = loginChange
  }

  function getLoginStatus(): Ref<boolean> {
    return userLoginStatus
  }

  function getUserByEmail(email: string): User | undefined {
    return users.value.find(user => user.email === email)
  }

  function setCurrentUser(user: User): void {
    currentUser.value = user
  }

  function getCurrentUser(): User | undefined {
    return currentUser.value
  }

  return { users, addUser, hasUser, isloginVaild, changeLoginStatus, getLoginStatus, getUserByEmail, setCurrentUser, getCurrentUser }
})
