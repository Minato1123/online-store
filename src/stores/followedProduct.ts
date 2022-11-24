import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Product } from '@/types/index'

export const useFollowedProductsStore = defineStore('followedProducts', () => {
  const followedProducts: Ref<Product[]> = ref([])

  function addFollowedProduct(product: Product) {
    followedProducts.value.push(product)
  }

  function removeFollowedProduct(product: Product) {
    followedProducts.value = followedProducts.value?.filter(p => p.id !== product.id)
  }

  function isInFollowedProducts(product: Product) {
    return followedProducts.value.some(p => p.id === product.id)
  }

  return { followedProducts, addFollowedProduct, removeFollowedProduct, isInFollowedProducts }
})
