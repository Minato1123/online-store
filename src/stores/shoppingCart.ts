import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ProductInCart } from '@/types/index'
import { useProductsStore } from '@/stores/product'
import { useProductBoughtListStore } from '@/stores/productBought'

let cartId = 0

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const { getProductById } = useProductsStore()
  const { addProductBought, addGroupId } = useProductBoughtListStore()
  const shoppingCartList = useLocalStorage<ProductInCart[]>('shopping-cart', [])

  if (shoppingCartList.value.length !== 0)
    cartId = shoppingCartList.value[shoppingCartList.value.length - 1].id

  function addShoppingCart(productId: number, specification: number | null, amount: number) {
    const p = getProductById(productId)

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

  function removeProductInShoppingCart(id: number) {
    const index = shoppingCartList.value.findIndex(p => p.id === id) // 找有無相同商品
    if (index !== -1) { // 找到相同的商品
      shoppingCartList.value.splice(index, 1)
    }
  }

  function cancelShoppingCart() {
    shoppingCartList.value = []
    cartId = 0
  }

  function updateProductsToBought() {
    shoppingCartList.value.forEach((p) => {
      addProductBought(p.productId, p.name, p.image, p.specification, p.amount, p.price)
    })
    addGroupId()
  }

  return { shoppingCartList, addShoppingCart, removeProductInShoppingCart, cancelShoppingCart, updateProductsToBought }
})
