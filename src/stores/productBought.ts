import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { productBought } from '@/types/index'

let productBoughtId = 0

export const useProductBoughtListStore = defineStore('productBoughtList', () => {
  const productBoughtList: Ref<productBought[]> = ref([])
  if (productBoughtList.value.length !== 0)
    productBoughtId = productBoughtList.value[productBoughtList.value.length - 1].id

  function addProductBought(productId: number, name: string, specification: string | null, amount: number, price: number) {
    productBoughtId++
    productBoughtList.value.push({ id: productBoughtId, productId, name, specification, amount, price, status: 'prepared' })
  }

  function cancelProductBought(id: number) {
    const index = productBoughtList.value.findIndex(p => p.id === id)
    if (index !== -1)
      productBoughtList.value.splice(index, 1)
  }

  function shipProductBought(id: number) {
    const index = productBoughtList.value.findIndex(p => p.id === id)
    if (index !== -1)
      productBoughtList.value[index].status = 'shipped'
  }

  function completeProductBought(id: number) {
    const index = productBoughtList.value.findIndex(p => p.id === id)
    if (index !== -1)
      productBoughtList.value[index].status = 'completed'
  }

  return { productBoughtList, addProductBought, cancelProductBought, shipProductBought, completeProductBought }
})
