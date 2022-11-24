import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Product } from '@/types/index'
import productList from '@/assets/json/products.json'

export const useProductsStore = defineStore('products', () => {
  const products: Ref<Product[]> = ref(productList)
  return { products }
})
