import type { Component } from 'vue'

export interface Product {
  id: number
  name: string
  categoryId: number
  subCategoryId: number
  price: number
  size: string | null
  wrapSize: string | null
  origin: string | null
  material: string | null
  content: string | null
  weight: string | null
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
  categoryId: number
  subCategoryId: number
  name: string
  price: number
  image: string
  specificationId: number | null
  specificationName: string | null
  amount: number
}

export interface ProductBought {
  id: number
  groupId: number
  productId: number
  name: string
  image: string
  specification: string | null
  amount: number
  price: number
}

export type { OrderPayment, OrderDelivery, OrderData } from '@/api/boughtItems/addOrder'

export interface BtnType {
  text: string
  color: string
  beforeTextIcon?: Component
  afterTextIcon?: Component
}

export interface InfoType {
  iconBeforeText?: Component
  text: string
  additionalText?: string
  color: string
  borderColor: string
  textInBtnNO?: BtnType
  textInBtnOK?: BtnType
}

export interface SlideType {
  slides: string[]
  height: string
  hasPage: boolean
  hasTimeInterval: boolean
  btnColor: 'white' | 'black'
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
