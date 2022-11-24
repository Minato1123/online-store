import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { productInCart } from '@/types/index'

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const shoppingCartList: Ref<productInCart[]> = ref([])

  function addShoppingCart(id: number, specification: string | null, amount: number): void {
    if (amount > 0) {
      const index = shoppingCartList.value.findIndex(p => p.id === id) // 找有無相同商品
      if (index !== -1) { // 已經有相同的商品
        shoppingCartList.value[index].amount += amount
      }
      else { // 找不到相同的商品
        shoppingCartList.value.push({ id, specification, amount })
      }
    }
  }

  function removeSomeShoppingCart(id: number, specification: string | null, amount: number) {
    if (amount > 0) {
      const index = shoppingCartList.value.findIndex(p => p.id === id) // 找有無相同商品
      if (index !== -1) { // 找到相同的商品
        if (shoppingCartList.value[index].specification === specification) { // 找到相同的商品規格
          shoppingCartList.value[index].amount -= amount
          if (shoppingCartList.value[index].amount <= 0)
            shoppingCartList.value.splice(index, 1)
        }
      }
    }
  }

  function removeShoppingCart(id: number, specification: string | null) {
    const index = shoppingCartList.value.findIndex(p => p.id === id) // 找有無相同商品
    if (index !== -1) { // 找到相同的商品
      if (shoppingCartList.value[index].specification === specification) { // 找到相同的商品規格
        shoppingCartList.value.splice(index, 1)
      }
    }
  }

  return { shoppingCartList, addShoppingCart, removeSomeShoppingCart, removeShoppingCart }
})
