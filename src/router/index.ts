import { base } from './../serve/base-http.service'
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
        redirect: {
          name: 'UserOrder',
        },
        children: [
          {
            path: 'order',
            name: 'UserOrder',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/User/UserOrder/UserOrder.vue'
              ),
          },
        ],
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Cart/Cart.vue'),
      },
      {
        path: '/good/:id',
        name: 'GoodDetail',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/GoodDetail/GoodDetail.vue'
          ),
      },
      {
        path: '/confirm/:orderId',
        name: 'OrderConfirm',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/OrderConfirm/OrderConfirm.vue'
          ),
      },
      {
        path: '/order/:orderId',
        name: 'Order',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Order/Order.vue'),
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

const whileList = ['Home', 'Main', 'GoodDetail']

router.beforeEach((to, from, next) => {
  const token = base.loadToken()
  console.log(to)
  if (whileList.includes(to.name as string) || token) {
    next()
  } else {
    next({
      path: '/',
    })
  }
})

export default router
