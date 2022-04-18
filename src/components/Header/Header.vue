<template>
  <header class="navbar">
    <div class="navbar_container">
      <div class="info">
        <div class="brand" @click="handleToHome">
          <img
            src="/Header/2cac505fff45659450cb223041e7eb5c_1539795377150607708.png"
            alt="米游铺"
          />
        </div>
        <div class="divider"></div>
        <div class="shop_icon" @click="handleToHome">
          <img
            src="/Header/6fc386b329c4b3726cc011c7a0ac85f5_3901303110715729633.png"
            alt="原神"
          />
        </div>
        <div class="shop_name" @click="handleToHome">万有铺子</div>
      </div>
      <div class="func">
        <div class="search">
          <input type="text" v-model="value" />
          <div class="search_icon" @click="handleSearch">
            <svg
              t="1649934445180"
              class="search-icon x-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6031"
            >
              <path
                d="M212.194304 726.972416c33.760256 33.760256 73.08288 60.269568 116.876288 78.792704 45.357056 19.18464 93.518848 28.911616 143.147008 28.911616s97.788928-9.728 143.145984-28.911616c25.648128-10.848256 49.750016-24.457216 72.112128-40.63744l156.345344 156.484608c6.677504 6.683648 15.43168 10.025984 24.18688 10.025984 8.74496 0 17.490944-3.334144 24.1664-10.00448 13.35808-13.345792 13.36832-34.994176 0.021504-48.35328L739.03616 719.985664c30.533632-32.160768 54.736896-69.082112 71.99744-109.889536 19.183616-45.357056 28.911616-93.518848 28.911616-143.147008s-9.728-97.789952-28.911616-143.147008c-18.523136-43.792384-45.033472-83.115008-78.792704-116.876288-33.76128-33.760256-73.083904-60.270592-116.876288-78.793728-45.35808-19.18464-93.518848-28.911616-143.147008-28.911616s-97.789952 9.728-143.147008 28.911616c-43.793408 18.523136-83.116032 45.033472-116.876288 78.793728s-60.269568 73.083904-78.792704 116.876288c-19.183616 45.357056-28.911616 93.518848-28.911616 143.147008s9.728 97.789952 28.911616 143.147008C151.923712 653.888512 178.434048 693.21216 212.194304 726.972416zM260.547584 255.279104c56.539136-56.539136 131.710976-87.676928 211.670016-87.676928 79.958016 0 155.13088 31.137792 211.670016 87.676928s87.675904 131.710976 87.675904 211.670016S740.425728 622.08 683.887616 678.619136c-56.539136 56.539136-131.712 87.676928-211.670016 87.676928-79.95904 0-155.13088-31.136768-211.670016-87.675904s-87.675904-131.712-87.675904-211.670016S204.008448 311.81824 260.547584 255.279104z"
                p-id="6032"
              ></path>
            </svg>
          </div>
        </div>
        <div class="user" :class="{ logined: isLogined }">
          <div class="profile" @click="handleValidate(handleToUser)">
            <img :src="avatar" />
          </div>
          <div class="menu">
            <div class="menu_item" @click="handleToUser">
              <div class="icon">
                <svg
                  t="1649938571145"
                  class="x-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="140495"
                >
                  <path
                    d="M929.647367 418.524122A417.878951 417.878951 0 1 0 364.40967 808.943233a227.835108 227.835108 0 0 0-81.563882 174.274826 40.781941 40.781941 0 0 0 40.781941 40.781941h376.281372a40.781941 40.781941 0 0 0 40.781941-40.781941 228.106988 228.106988 0 0 0-81.563882-174.274826 418.150831 418.150831 0 0 0 270.520207-390.419111zM653.145809 942.436119H370.662901a147.086866 147.086866 0 0 1 282.482908 0z m-141.105514-187.868807a336.31507 336.31507 0 1 1 336.04319-336.04319 336.58695 336.58695 0 0 1-336.04319 336.04319z"
                    p-id="140496"
                  ></path>
                  <path
                    d="M510.952776 636.299685a284.657945 284.657945 0 0 1-127.783414-29.906757A40.781941 40.781941 0 0 1 420.416868 533.257315a206.08474 206.08474 0 0 0 178.35302 2.175036 40.781941 40.781941 0 0 1 34.52871 73.951253 283.298547 283.298547 0 0 1-122.345822 26.916081z"
                    p-id="140497"
                  ></path>
                </svg>
              </div>
              <div class="text">个人中心</div>
            </div>
            <div class="menu_item" @click="handleQuit">
              <div class="icon">
                <svg
                  t="1649938646716"
                  class="quit-icon x-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="141095"
                >
                  <path
                    d="M727.466667 1024H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h601.6A128 128 0 0 1 853.333333 128v64a42.666667 42.666667 0 0 1-85.333333 0V128a42.666667 42.666667 0 0 0-40.533333-42.666667H128a42.666667 42.666667 0 0 0-42.666667 42.666667v768a42.666667 42.666667 0 0 0 42.666667 42.666667h601.6a42.666667 42.666667 0 0 0 38.4-42.666667v-192a42.666667 42.666667 0 0 1 85.333333 0V896a128 128 0 0 1-125.866666 128zM981.333333 554.666667H341.333333a42.666667 42.666667 0 0 1 0-85.333334h537.173334l-55.893334-55.466666a42.666667 42.666667 0 0 1 60.586667-60.586667l128 128a42.666667 42.666667 0 0 1 8.96 46.506667A42.666667 42.666667 0 0 1 981.333333 554.666667z"
                    p-id="141096"
                  ></path>
                </svg>
              </div>
              <div class="text">退出登录</div>
            </div>
          </div>
        </div>
        <div class="cart" @click="handleValidate(handleToCart)">
          <div class="cart_icon">
            <svg
              t="1649937067005"
              class="cart-icon x-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="85483"
            >
              <path
                d="M930.2 275.5c-19.5-28.2-51.6-45.1-85.8-45.1H263.2l-3.6-18.2c-6.7-33.8-29.2-61-59-74.7-13.3-6.1-28-9.5-43.4-9.5H106c-10.4 0-19.6 5-25.5 12.7-4.1 5.3-6.5 12-6.5 19.3 0 17.7 14.3 32 32 32h51.3c19.3 0.1 35.9 13.7 39.7 32.7l31.5 159.1c20.9 119.9 30.9 167.5 37.3 188.2l16.1 81.2c6.4 31.9 34.3 54.9 66.8 55H798c17.7 0 32-14.3 32-32s-14.3-32-32-32H348.6c-2 0-3.8-1.4-4.2-3.4l-7.6-38.6c19.6 0.5 46.2 0.6 82.9 0.6 16.7 0 35.5 0 56.6-0.1 95.3-0.3 207.1-1.4 284.1-2.3 58-0.5 109.6-36.7 129.8-91L942 371.9c12.1-32.2 7.7-68.2-11.8-96.4zM370.3 739c-31.5-0.1-60 18.9-72.1 48-12.1 29.1-5.5 62.6 16.8 84.9s55.8 29 84.9 16.9c29.1-12 48.1-40.5 48.1-72 0.1-42.9-34.7-77.7-77.7-77.8zM740.6 739c-31.5-0.1-60 18.9-72.1 48-12.1 29.1-5.5 62.6 16.8 84.9 22.3 22.3 55.8 29 84.9 16.9 29.1-12 48.1-40.5 48.1-72 0-42.9-34.8-77.7-77.7-77.8z"
                p-id="85484"
              ></path>
            </svg>
          </div>
          <div class="cart_text">购物车</div>
          <div class="cart_count" v-if="count > 0">{{ count }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'
import { emitter } from '../../util/emitter'
import { ref, onMounted, watchEffect } from 'vue'
import { base } from '@/serve/base-http.service'
import { useRoute } from 'vue-router'

const count = ref(0)
const value = ref('')
const avatar = ref('/Header/profile.png')
const isLogined = ref(false)

const handleSearch = () => {
  // console.log(value.value)
  router.push({
    path: '/main',
    query: {
      search: value.value
    }
  })
}

const handleToUser = (): void => {
  router.push({
    name: 'User'
  })
}
const handleToCart = (): void => {
  router.push({
    name: 'Cart'
  })
}
const handleToHome = (): void => {
  router.push({
    name: 'Home'
  })
}

type callback = () => void

const handleValidate = (cb: callback) => {
  if (isLogined.value) {
    cb()
  } else {
    emitter.emit('toLogin', true)
  }
}

const handleQuit = () => {
  base._handle401()
  checkLogin()
}

const checkLogin = () => {
  const accessToken = base.loadToken()
  if (accessToken) {
    isLogined.value = true
    getCartCount()
    avatar.value = '/Header/avatar40017.webp'
  } else {
    isLogined.value = false
    avatar.value = '/Header/profile.png'
  }
}

emitter.on('logined', checkLogin)

const getCartCount = () => {
  base.get('carts/total').then((res) => {
    console.log('total cart', res)
    count.value = res?.data
  })
}

emitter.on('cart-change', getCartCount)

const route = useRoute()

watchEffect(() => {
  value.value = (route.query.search as string) ?? ''
})

onMounted(() => {
  checkLogin()
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 11;
  min-width: 1260px;
  height: 100px;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
  font-size: 14px;
}

.navbar_container {
  margin: 0 auto;
  width: 1260px;
  height: 100%;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info {
  display: flex;
  align-items: center;
}

.brand {
  height: 82px;
  width: 99px;
}

.shop_icon {
  height: 82px;
  width: 82px;
  margin-right: 20px;
}

img {
  width: 100%;
  height: 100%;
}

.divider {
  width: 3px;
  height: 22px;
  background: #f1f1f1;
  border-radius: 2px;
  margin: 18px;
}

.func {
  display: flex;
  align-items: center;
}

.search {
  margin-right: 30px;
  margin-top: -4px;
  display: flex;
}

.search input {
  width: 190px;
  border-radius: 6px 0 0 6px;
  padding: 10px;
  height: 40px;
  caret-color: #ff6d6d;
  border: 1px solid #e7e7ea;
  border-right-width: 0;
  font-size: 14px;
  line-height: 20px;
  color: #16162e;
  transition: all 0.4s;
}

input:focus {
  outline: 0;
}

.search_icon {
  height: 40px;
  width: 40px;
  background-color: #f8f8f8;
  border-radius: 0px 6px 6px 0px;
  color: #9696a1;
  border: 1px solid #e7e7ea;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
}

.search_icon:hover {
  background-color: #ff6d6d;
  color: #fff;
}

.search-icon {
  font-size: 20px;
}

.x-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.search input:hover,
.search input:hover + .search_icon {
  border-color: #9696a1;
}

.search input:focus {
  width: 450px;
  border-color: #9696a1;
}

.search input:focus + .search_icon {
  border-top-color: #9696a1;
  border-right-color: #9696a1;
  border-bottom-color: #9696a1;
}

.user {
  height: 68px;
  margin-right: 24px;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.user.logined:hover .menu {
  display: block;
}

.menu {
  left: -44px;
  bottom: 0px;
  display: none;
  color: #2f3f56;
  position: absolute;
  z-index: 9;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #eff1f4;
  transform: translateY(100%);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.menu_item {
  display: flex;
  align-items: center;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  padding: 0 11px;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border-radius: 8px;
}

.menu_item:hover {
  color: #ff6d6d;
  background-color: rgba(255, 109, 109, 0.1);
}

.icon {
  color: rgb(150, 150, 161);
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  margin-right: 8px;
  font-size: 16px;
}

.quit-icon {
  font-size: 14px;
}

.menu_item:hover .icon {
  color: #ff6d6d;
}

.text {
  flex: 1;
}

.profile {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  overflow: hidden;
}

.profile {
  object-fit: cover;
}

.cart {
  display: flex;
  align-items: center;
  color: #9696a1;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.cart:hover {
  color: #ff6d6d;
}

.cart > div + div {
  margin-left: 6px;
}

.cart_icon,
.cart_text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart_icon {
  height: 24px;
  width: 24px;
}

.cart-icon {
  font-size: 24px;
}

.cart_count {
  display: inline-block;
  box-sizing: border-box;
  line-height: 16px;
  height: 16px;
  min-width: 16px;
  padding: 0 3px;
  text-align: center;
  border-radius: 999px;
  font-size: 12px;
  color: #fff;
  font-weight: 400;
  background-color: #ff6d6d;
}
</style>
