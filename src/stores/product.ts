import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Product } from '@/types/index'
import productList from '@/assets/json/products.json'

export const useProductsStore = defineStore('products', () => {
  const products: Ref<Product[]> = ref(productList)

  function getProductById(id: number): Product | undefined {
    return products.value.find(product => product.id === id)
  }

  function getProductSpec(id: number, spec: number | null) {
    const product = getProductById(id)
    if (product == null)
      return

    if (spec == null)
      return '無'

    else
      return product.specifications[spec]
  }

  return { products, getProductById, getProductSpec }
})
