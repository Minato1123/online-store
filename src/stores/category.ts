import { defineStore } from 'pinia'
import type { Category } from '@/types/index'
import categoryList from '@/assets/json/categories.json'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>(categoryList)

  function getCategoryById(id: number): Category | undefined {
    return categories.value.find(category => category.id === id)
  }

  function getSubCategoryById(categoryId: number, subCategoryId: number) {
    const category = getCategoryById(categoryId)
    if (category)
      return category.subCategories.find(subCategory => subCategory.id === subCategoryId)
  }

  return { categories, getCategoryById, getSubCategoryById }
})
