import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { ProductInCart } from '@/types/index'
import { useProductsStore } from '@/stores/product'

let cartId = 0

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const { getProduct } = useProductsStore()

  const shoppingCartList: Ref<ProductInCart[]> = ref([])
  if (shoppingCartList.value.length !== 0)
    cartId = shoppingCartList.value[shoppingCartList.value.length - 1].id

  function addShoppingCart(productId: number, specification: string | null, amount: number) {
    const p = getProduct(productId)

    if (p == null)
      return

    const product: ProductInCart = {
      id: cartId,
      productId,
      name: p.name,
      price: p.price,
      image: p.images[0],
      specification,
      amount,
    }
    const index = shoppingCartList.value.findIndex(p => p.productId === productId) // 找有無相同商品
    if (index !== -1) { // 已經有相同的商品
      if (shoppingCartList.value[index].specification === specification) { // 找到相同的商品規格
        shoppingCartList.value[index].amount += amount
      }
      else {
        cartId++
        shoppingCartList.value.push(product)
      }
    }
    else { // 找不到相同的商品
      cartId++
      shoppingCartList.value.push(product)
    }
  }

  function removeSomeShoppingCart(id: number, amount: number) {
    if (amount > 0) {
      const index = shoppingCartList.value.findIndex(p => p.id === id) // 找有無相同商品
      if (index !== -1) { // 找到相同的商品
        shoppingCartList.value[index].amount -= amount
        if (shoppingCartList.value[index].amount <= 0)
          shoppingCartList.value.splice(index, 1)
      }
    }
  }

  return { shoppingCartList, addShoppingCart, removeSomeShoppingCart }
})
