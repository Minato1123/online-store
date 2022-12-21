import type { Component } from 'vue'

export interface Product {
  id: number
  name: string
  categoryId: number
  subCategoryId: number
  price: number
  description: string[]
  images: string[]
  specifications: string[]
  details: {
    size: string | null
    wrapSize: string | null
    origin: string | null
    material: string | null
    content: string | null
    weight: string | null
  }
}

export interface Category {
  id: number
  name: string
  path: string
  icon: string
  isOpen: boolean
  subCategories: {
    id: number
    name: string
    path: string
  }[]
}

export interface ProductInCart {
  id: number
  productId: number
  name: string
  price: number
  image: string
  specification: string | null
  amount: number
}

export interface ProductBought {
  id: number
  productId: number
  name: string
  image: string
  specification: string | null
  amount: number
  price: number
  status: 'prepared' | 'shipped' | 'completed'
}

export interface BtnType {
  text: string
  color: string
  beforeTextIcon?: Component
  afterTextIcon?: Component
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  birthday: string
  mobile: string
  address: string | undefined
}
