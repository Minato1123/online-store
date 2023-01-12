import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/category/:categoryId',
      name: 'categories',
      component: () => import('../pages/Category.vue'),
    },
    {
      path: '/category/:categoryId/:subCategoryId',
      name: 'subCategories',
      component: () => import('../pages/SubCategory.vue'),
    },
    {
      path: '/category/:categoryId/:subCategoryId/product/:productId',
      name: 'product',
      component: () => import('../pages/Product.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/Register.vue'),
    },
    {
      path: '/user',
      name: 'user',
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../pages/Profile.vue'),
        },
        {
          path: 'payment',
          name: 'payment',
          component: () => import('../pages/Payment.vue'),
        },
        {
          path: 'password',
          name: 'password',
          component: () => import('../pages/Password.vue'),
        },
        {
          path: 'purchase-list',
          name: 'purchaseList',
          component: () => import('../pages/PurchaseList.vue'),
        },
      ],
    },
    {
      path: '/following',
      name: 'following',
      component: () => import('../pages/Following.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/Cart.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../pages/Checkout.vue'),
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: () => import('../pages/Delivery.vue'),
    },
    {
      path: '/completed/:orderId',
      name: 'completed',
      component: () => import('../pages/Completed.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
