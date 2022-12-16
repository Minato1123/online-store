import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Product } from '@/types/index'
import productList from '@/assets/json/products.json'

export const useProductsStore = defineStore('products', () => {
  const products: Ref<Product[]> = ref(productList)

  function getProduct(id: number): Product | undefined {
    return products.value.find(product => product.id === id)
  }

  return { products, getProduct }
})
