import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ProductInCart } from '@/types/index'
import { getProduct } from '@/api/products/getProduct'
import { getProductImagesByProductId } from '@/api/productImages/getProductImagesByProductId'
import { getProductSpecificationsByProductId } from '@/api/productSpecifications/getProductSpecificationsByProductId'
import { addProductToShoppingCart } from '@/api/cartItems/addProductToShoppingCart'

let cartId = 1

export const useCartStore = defineStore('cart', () => {
  const cartList = useLocalStorage<ProductInCart[]>('cart', [])

  if (cartList.value.length !== 0)
    cartId = cartList.value[cartList.value.length - 1].id

  async function addLocalCart(productId: number, specification: number | null, amount: number) {
    const product = (await getProduct({ id: productId })).data
    const productImage = (await getProductImagesByProductId({ productId })).data
    const productSpec = (await getProductSpecificationsByProductId({ productId })).data

    const tempProduct: ProductInCart = {
      id: cartId,
      productId,
      categoryId: product.categoryId,
      subCategoryId: product.subCategoryId,
      name: product.name,
      price: product.price,
      image: productImage[0].image,
      specificationId: specification,
      specificationName: productSpec.find(s => s.id === specification)?.specName ?? null,
      amount,
    }

    const indexes: number[] = cartList.value.reduce((acc: number[], cur, index) => {
      if (cur.productId === productId)
        acc.push(index)

      return acc
    }, [])

    if (indexes.length > 0) { // 已經有相同的商品
      const index = indexes.findIndex(i => cartList.value[i].specificationId === specification)
      if (index !== -1) { cartList.value[index].amount += amount }

      else {
        cartId++
        cartList.value.push(tempProduct)
      }
    }
    else { // 找不到相同的商品
      cartId++
      cartList.value.push(tempProduct)
    }
  }

  // 更新數量
  function updateAmountOfProductInLocalCart(id: number, amount: number) {
    const theProduct = cartList.value.find(p => p.id === id) // 找有無相同商品
    if (theProduct != null) {
      if (theProduct.specificationId == null) { // 沒有規格
        theProduct.amount = amount
      }
      else {
        const theSpecProduct = cartList.value.find(p => p.specificationId === theProduct.specificationId)
        if (theSpecProduct == null)
          return
        theSpecProduct.amount = amount
      }
    }
  }

  // 刪除商品
  function removeProductInLocalCart(id: number) {
    const index = cartList.value.findIndex(p => p.id === id) // 找有無相同商品
    if (index !== -1) { // 找到相同的商品
      cartList.value.splice(index, 1)
    }
  }

  // 清空購物車
  function deleteAllLocalCart() {
    cartList.value = []
    cartId = 1
  }

  // 將購物車內容更新到資料庫
  async function updateLocalCartToDB(userId: number) {
    if (userId == null)
      return
    await Promise.all(cartList.value.map(async (p) => {
      await addProductToShoppingCart({
        data: {
          userId,
          productId: p.productId,
          specificationId: p.specificationId,
          amount: p.amount,
        },
      })
    }))
    deleteAllLocalCart()
  }

  function getNumOfLocalCart(): number {
    return cartList.value.reduce((acc, cur) => acc + cur.amount, 0)
  }

  return { cartList, addLocalCart, updateAmountOfProductInLocalCart, removeProductInLocalCart, deleteAllLocalCart, updateLocalCartToDB, getNumOfLocalCart }
})
