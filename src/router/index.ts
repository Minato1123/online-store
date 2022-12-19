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
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
          component: () => import('../pages/Profile.vue'),
        },
        {
          path: 'payment',
          component: () => import('../pages/Payment.vue'),
        },
        {
          path: 'password',
          component: () => import('../pages/Password.vue'),
        },
        {
          path: 'purchase-list',
          component: () => import('../pages/PurchaseList.vue'),
        },
      ],
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/Cart.vue'),
    },
  ],
})

export default router
