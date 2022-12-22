import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Category } from '@/types/index'
import categoryList from '@/assets/json/categories.json'

export const useCategoriesStore = defineStore('categories', () => {
  const categories: Ref<Category[]> = ref(categoryList)
  return { categories }
})
