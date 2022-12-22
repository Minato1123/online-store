import { defineStore } from 'pinia'
import type { Category } from '@/types/index'
import categoryList from '@/assets/json/categories.json'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>(categoryList)
  return { categories }
})
