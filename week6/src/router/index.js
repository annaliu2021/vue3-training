import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [ //巢狀路由不用/
        {
          path: 'Home',
          name: 'home',
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'Products',
          name: 'products',
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          path: 'Product/:id',
          name: 'oneProduct',
          component: () => import('../views/front/ProductView.vue')
        },
        {
          path: 'Cart',
          name: 'cart',
          component: () => import('../views/front/CartView.vue')
        },
        {
          path: 'Order',
          name: 'order',
          component: () => import('../views/front/OrderView.vue')
        },
        {
          path: 'Login',
          name: 'login',
          component: () => import('../views/front/LoginView.vue')
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/DashboardLayout.vue'),
      children: [
        {
          path: 'Home',
          name: 'adminHome',
          component: () => import('../views/admin/HomeView.vue')
        },
        {
          path: 'Orders',
          name: 'adminOrders',
          component: () => import('../views/admin/OrdersView.vue')
        },
        {
          path: 'Products',
          name: 'adminProducts',
          component: () => import('../views/admin/ProductsView.vue')
        }
      ]
    },

  ]
})

export default router
