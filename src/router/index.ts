import { base } from './../serve/base-http.service'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

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
        meta: {
          title: '原神万有铺子-米游铺',
        },
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
            meta: {
              title: '我的订单-米游铺',
            },
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
        meta: {
          title: '购物车-原神万有铺子-米游铺',
        },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Cart/Cart.vue'),
      },
      {
        path: '/good/:id',
        name: 'GoodDetail',
        meta: {
          title: '商品详情-原神万有铺子-米游铺',
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/GoodDetail/GoodDetail.vue'
          ),
      },
      {
        path: '/confirm/:orderId',
        name: 'OrderConfirm',
        meta: {
          title: '确认订单-米游铺',
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/OrderConfirm/OrderConfirm.vue'
          ),
      },
      {
        path: '/order/:orderId',
        name: 'Order',
        meta: {
          title: '订单详情-米游铺',
        },
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
  scrollBehavior: () => {
    return {
      top: 0,
    }
  },
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const whileList = ['Home', 'Main', 'GoodDetail']

router.beforeEach((to, from, next) => {
  const token = base.loadToken()

  if (from.name !== to.name) document.title = '米游铺'

  if (whileList.includes(to.name as string) || token) {
    next()
  } else {
    next({
      path: '/',
    })
  }
})

router.afterEach(to => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
})

export default router
