<template>
    <div class="category_navbar">
        <div class="wrapper">
            <div :class="{ nav_icon: true, disable: toRight }" @click="handleToRight">&lt;</div>
            <div class="slider" :class="{ beauty: isBeauty }">
                <div :class="item1Class" class="slider_item">
                    <div class="category_item">
                        <div
                            class="levelone"
                            @click="handleToCategory(defaultItem)"
                        >{{ defaultItem }}</div>
                    </div>
                    <div class="category_item" v-for="item in categores1" :key="item.id">
                        <div class="levelone" @click="handleToCategory(item.name)">
                            {{ item.name }}
                            <span
                                class="trangle"
                                v-if="item.children?.length !== 0"
                            >A</span>
                        </div>
                        <div class="container" v-if="item.children?.length !== 0">
                            <div
                                class="leveltwo"
                                v-for="cate in item.children"
                                :key="cate.id"
                                @click="handleToCategory(cate.name)"
                            >{{ cate.name }}</div>
                        </div>
                    </div>
                </div>
                <div :class="item2Class" class="slider_item">
                    <div class="category_item" v-for="item in categores2" :key="item.id">
                        <div class="levelone" @click="handleToCategory(item.name)">
                            {{ item.name }}
                            <span
                                class="trangle"
                                v-if="item.children?.length !== 0"
                            >A</span>
                        </div>
                        <div class="container" v-if="item.children?.length !== 0">
                            <div
                                class="leveltwo"
                                v-for="cate in item.children"
                                :key="cate.id"
                                @click="handleToCategory(cate.name)"
                            >{{ cate.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{ nav_icon: true, disable: toLeft }" @click="handleToLeft">&gt;</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { base } from '@/serve/base-http.service';
import { defineEmits, reactive, ref } from 'vue'

const defaultItem = ref('全部商品')
interface category {
    id: number
    parentId: number
    name: string
    children?: Array<category>
}
const categores1 = reactive<Array<category>>([])
const categores2 = reactive<Array<category>>([])

const emit = defineEmits(['category-change'])
const handleToCategory = (category: string) => {
    emit('category-change', category)
}

const load = () => {
    base.get('categories').then(res => {
        console.log(res);
        categores1.length = 0
        categores2.length = 0
        categores1.push(...res?.data)
        categores2.push(categores1.pop() as category)
    })
}

interface ClassObj {
    center?: boolean
    hidden?: boolean
    left?: boolean
    right?: boolean
}

const toLeft = ref(false)
const toRight = ref(true)
const item1Class = reactive<ClassObj>({ center: true })
const item2Class = reactive<ClassObj>({ right: true, hidden: true })
const isBeauty = ref(false)

const getBeauty = (duration: number) => {
    isBeauty.value = true
    setTimeout(() => {
        isBeauty.value = false
    }, duration)
}

const handleToLeft = () => {
    getBeauty(300)

    item2Class.right = false
    item2Class.hidden = false
    item2Class.center = true

    item1Class.center = false
    item1Class.left = true
    item1Class.hidden = true

    toLeft.value = !toLeft.value
    toRight.value = !toRight.value
}
const handleToRight = () => {
    getBeauty(300)

    item2Class.right = true
    item2Class.center = false
    item2Class.hidden = true

    item1Class.center = true
    item1Class.left = false
    item1Class.hidden = false

    toLeft.value = !toLeft.value
    toRight.value = !toRight.value
}

load()
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
.hidden {
    opacity: 0;
    pointer-events: none;
}
.center {
    transform: translateX(0%);
}
.right {
    transform: translateX(100%);
}
.left {
    transform: translateX(-100%);
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
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    margin-left: 4px;
    color: #c5c5cb;
    height: 16px;
    width: 16px;
    display: inline-block;
    line-height: 16px;
    text-align: center;
}
</style>
