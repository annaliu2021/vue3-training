import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/front/LogonView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminLayout.vue'),
    children: [
      {
        path: 'products',
        name: 'adminProducts',
        component: () => import('../views/admin/ProductsView.vue')
      },
      {
        path: 'orders',
        name: 'adminOrders',
        component: () => import('../views/admin/OrdersView.vue')
      },
      {
        path: 'coupons',
        name: 'adminCoupons',
        component: () => import('../views/admin/CouponsView.vue')
      }
    ]
  }
  // {
  //   // 404
  //   path: '/:pathMath(.*)*',
  //   component: () => import('../views/NotFound.vue')
  // },
  // {
  //   // 重新導向
  //   path: '/newPage/:pathMath(.*)*',
  //   redirect: {
  //     name: 'home'
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
