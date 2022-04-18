<template>
  <div class="category_navbar" v-scroll="{ className: 'drawed', handleScroll }">
    <div class="wrapper">
      <div :class="{ nav_icon: true, disable: toRight }" @click="handleToRight">
        <svg
          t="1649936383580"
          class="left-icon x-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="39858"
        >
          <path
            d="M684.29 799.276L393.929 513.019 684.29 226.762c37.685-37.153 38.003-97.625 0.707-134.384-37.297-36.758-98.646-36.435-136.331 0.718l-357.43 352.378c-0.155 0.153-0.297 0.314-0.451 0.468-0.084 0.082-0.172 0.157-0.256 0.239-18.357 18.092-27.581 41.929-27.743 65.902-0.004 0.311-0.017 0.623-0.018 0.934 0.001 0.316 0.014 0.632 0.018 0.948 0.165 23.97 9.389 47.803 27.743 65.892 0.083 0.082 0.171 0.157 0.255 0.239 0.154 0.154 0.296 0.315 0.452 0.468l357.43 352.378c37.685 37.153 99.034 37.476 136.331 0.718 37.297-36.758 36.979-97.231-0.707-134.384z"
            p-id="39859"
          ></path>
        </svg>
      </div>
      <div class="slider" :class="{ beauty: isBeauty }">
        <transition name="first">
          <div class="slider_item" v-if="isFirst">
            <div class="category_item">
              <div class="levelone" @click="handleToAllGoods">
                {{ defaultItem }}
              </div>
            </div>
            <div
              class="category_item"
              v-for="item in categores1"
              :key="item.id"
            >
              <div
                class="levelone"
                @click="
                  handleToCategory([
                    { id: item.id, parentId: item.parentId, name: item.name }
                  ])
                "
              >
                {{ item.name }}
                <span class="trangle" v-if="item.children?.length !== 0">
                  <svg
                    t="1649934894859"
                    class="trangle-icon x-icon"
                    viewBox="0 0 1638 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7644"
                  >
                    <path
                      d="M978.944 824.1152L1531.904 133.12A81.92 81.92 0 0 0 1468.0064 0H170.3936A81.92 81.92 0 0 0 106.496 133.12l552.96 690.9952a204.8 204.8 0 0 0 319.488 0z"
                      p-id="7645"
                    ></path>
                  </svg>
                </span>
              </div>
              <div class="container" v-if="item.children?.length !== 0">
                <div
                  class="leveltwo"
                  v-for="cate in item.children"
                  :key="cate.id"
                  @click="
                    handleToCategory([
                      { id: item.id, parentId: item.parentId, name: item.name },
                      cate
                    ])
                  "
                >
                  {{ cate.name }}
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition name="second">
          <div class="slider_item" v-if="!isFirst">
            <div
              class="category_item"
              v-for="item in categores2"
              :key="item.id"
            >
              <div
                class="levelone"
                @click="
                  handleToCategory([
                    { id: item.id, parentId: item.parentId, name: item.name }
                  ])
                "
              >
                {{ item.name }}
                <span class="trangle" v-if="item.children?.length !== 0">
                  <svg
                    t="1649934894859"
                    class="trangle-icon x-icon"
                    viewBox="0 0 1638 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7644"
                  >
                    <path
                      d="M978.944 824.1152L1531.904 133.12A81.92 81.92 0 0 0 1468.0064 0H170.3936A81.92 81.92 0 0 0 106.496 133.12l552.96 690.9952a204.8 204.8 0 0 0 319.488 0z"
                      p-id="7645"
                    ></path>
                  </svg>
                </span>
              </div>
              <div class="container" v-if="item.children?.length !== 0">
                <div
                  class="leveltwo"
                  v-for="cate in item.children"
                  :key="cate.id"
                  @click="handleToCategory([item, cate])"
                >
                  {{ cate.name }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div :class="{ nav_icon: true, disable: toLeft }" @click="handleToLeft">
        <svg
          t="1649936383580"
          class="right-icon x-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="39858"
        >
          <path
            d="M684.29 799.276L393.929 513.019 684.29 226.762c37.685-37.153 38.003-97.625 0.707-134.384-37.297-36.758-98.646-36.435-136.331 0.718l-357.43 352.378c-0.155 0.153-0.297 0.314-0.451 0.468-0.084 0.082-0.172 0.157-0.256 0.239-18.357 18.092-27.581 41.929-27.743 65.902-0.004 0.311-0.017 0.623-0.018 0.934 0.001 0.316 0.014 0.632 0.018 0.948 0.165 23.97 9.389 47.803 27.743 65.892 0.083 0.082 0.171 0.157 0.255 0.239 0.154 0.154 0.296 0.315 0.452 0.468l357.43 352.378c37.685 37.153 99.034 37.476 136.331 0.718 37.297-36.758 36.979-97.231-0.707-134.384z"
            p-id="39859"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { base } from '@/serve/base-http.service'
import { onMounted, reactive, ref } from 'vue'
import { emitter } from '@/util/emitter'

const defaultItem = ref('全部商品')
interface Category {
  id: number
  parentId: number
  name: string
  children?: Array<Category>
}
const categores1 = reactive<Array<Category>>([])
const categores2 = reactive<Array<Category>>([])

type Categories = Category[]
const handleToCategory = (categories: Categories) => {
  // 数据传给面包屑
  emitter.emit('category-change', categories)
  router.push({
    path: '/main',
    query: {
      categoryId: categories.pop()?.id
    }
  })
}

const handleToAllGoods = () => {
  // 数据传给面包屑
  emitter.emit('category-change', [])
  router.push({
    name: 'Main'
  })
}

const toLeft = ref(true)
const toRight = ref(true)
const isFirst = ref(true)
const isBeauty = ref(false)

const getBeauty = (duration: number) => {
  isBeauty.value = true
  setTimeout(() => {
    isBeauty.value = false
  }, duration)
}

const handleToLeft = () => {
  getBeauty(300)
  isFirst.value = false

  toLeft.value = !toLeft.value
  toRight.value = !toRight.value
}
const handleToRight = () => {
  getBeauty(300)
  isFirst.value = true

  toLeft.value = !toLeft.value
  toRight.value = !toRight.value
}

const handleScroll = (el: HTMLDivElement, className: string) => {
  const classList = el.classList
  let top = 0
  return () => {
    const cur = document.documentElement.scrollTop
    if (top > cur && classList.contains(className)) {
      classList.remove(className)
    } else if (top < cur && !classList.contains(className)) {
      classList.add(className)
    }
    top = cur
  }
}

const load = () => {
  base.get('categories').then((res) => {
    console.log('categories', res)
    categores1.length = 0
    categores2.length = 0
    categores1.push(...res?.data)
    categores2.push(...(categores1.splice(7, 8) as Category[]))
    if (categores2.length > 0) toLeft.value = false
  })
}

onMounted(() => {
  load()
})
</script>

<style scoped>
.category_navbar {
  position: sticky;
  top: 100px;
  z-index: 10;
  min-width: 1260px;
  height: 44px;
  box-shadow: 0px 2px 2px 0px rgb(150 150 161 / 5%);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #fff;
}

.category_navbar.drawed {
  top: 44px;
}

.wrapper {
  margin: 0 auto;
  width: 1260px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider {
  position: relative;
  height: 100%;
  flex-grow: 1;
}

.slider.beauty {
  overflow: hidden;
}

.slider_item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.first-enter-from,
.first-leave-to {
  left: -100%;
  overflow: hidden;
}

.first-enter-to,
.first-leave-from,
.second-enter-to,
.second-leave-from {
  left: 0;
  overflow: hidden;
}

.second-enter-from,
.second-leave-to {
  left: 100%;
  overflow: hidden;
}

.category_item {
  position: relative;
}

.levelone {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
  color: #16162e;
  line-height: 20px;
  width: 140px;
  height: 36px;
  padding: 0 8px;
  margin: 4px 0;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.container {
  position: absolute;
  opacity: 0;
  right: auto;
  max-height: 432px;
  width: 204px;
  overflow: auto;
  border-radius: 8px;
  border: 8px solid transparent;
  border-right: none;
  padding: 0;
  box-shadow: 0 0 0 1px #eff1f4;
  margin-right: 8px;
  transition-duration: 150ms;
  pointer-events: none;
  background-color: #fff;
}

.category_item:hover .levelone {
  color: #ff6d6d;
  background-color: rgba(255, 109, 109, 0.1);
}

.category_item:hover .container {
  opacity: 1;
  pointer-events: initial;
}

.leveltwo {
  display: block;
  padding: 8px 9px;
  font-size: 14px;
  font-weight: 400;
  color: #2f3f56;
  line-height: 20px;
  border-radius: 6px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  word-break: break-all;
}

.leveltwo:hover {
  color: #ff6d6d;
  background-color: rgba(255, 109, 109, 0.1);
}

.nav_icon {
  flex-shrink: 0;
  cursor: pointer;
  background-color: rgba(150, 150, 161, 0.5);
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;
}

.nav_icon:hover {
  background-color: #ff6d6d;
}

.nav_icon.disable {
  opacity: 0;
  pointer-events: none;
}

.trangle {
  margin-left: 4px;
  height: 16px;
  width: 16px;
  display: inline-block;
  line-height: 16px;
  text-align: center;
}

.trangle-icon {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  color: #c5c5cb;
  font-size: 9px;
}

.category_item:hover .trangle-icon {
  color: #ff6d6d;
  transform-origin: center 40%;
  transform: rotateZ(180deg);
}

.left-icon,
.right-icon {
  font-size: 11px;
}

.right-icon {
  transform: rotateZ(180deg);
}

.x-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
