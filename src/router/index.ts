import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      name: 'Main',
    },
    children: [
      {
        path: '/main',
        name: 'Main',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Main/Main.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/User/User.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Cart/Cart.vue'),
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/GoodDetail/GoodDetail.vue'),
      },
      {
        path: '/orderConfirm',
        name: 'OrderConfirm',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/OrderConfirm/OrderConfirm.vue'),
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
