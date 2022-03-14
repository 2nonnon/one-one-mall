<template>
    <div class="category_navbar">
        <div class="wrapper">
            <div class="left disable">&lt;</div>
            <div class="slider">
                <div class="slider_item center">
                    <div class="category_item" v-for="item, i in categores1" :key="i">
                        <div class="levelone" @click="handleToCategory(item.name)">
                            {{ item.name }}
                            <span class="trangle" v-if="item.children">A</span>
                        </div>
                        <div class="container" v-if="item.children">
                            <div
                                class="leveltwo"
                                v-for="cate, i in item.children"
                                :key="i"
                                 @click="handleToCategory(cate.name)"
                            >{{ cate.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="slider_item hidden">
                    <div class="category_item" v-for="item, i in categores2" :key="i">
                        <div class="levelone">{{ item.name }}</div>
                        <div class="container" v-if="item.children">
                            <div
                                class="leveltwo"
                                v-for="cate, i in item?.children"
                                :key="i"
                            >{{ cate.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">&gt;</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
interface category {
    id?: number
    parentId?: number
    name: string
    children?: Array<category>
}
const categores1: Array<category> = [
    { name: '全部商品' },
    {
        name: '角色-旅行征程', children: [{
            "name": "派蒙"
        },
        {
            "name": "旅行者男（空）"
        },
        {
            "name": "旅行者女（荧）"
        },
        {
            "name": "怪物敌人"
        },]
    },
    {
        name: '角色-蒙德城', children: [{
            "name": "诺艾尔"
        },
        {
            "name": "菲谢尔"
        },
        {
            "name": "砂糖"
        },
        {
            "name": "莫娜"
        },
        {
            "name": "迪奥娜"
        },
        {
            "name": "阿贝多"
        },
        {
            "name": "罗莎莉亚"
        },
        {
            "name": "优菈"
        },
        {
            "name": "班尼特"
        },
        {
            "name": "琴"
        },
        {
            "name": "安柏"
        },
        {
            "name": "丽莎"
        },
        {
            "name": "凯亚"
        },
        {
            "name": "芭芭拉"
        },
        {
            "name": "迪卢克"
        },
        {
            "name": "雷泽"
        },
        {
            "name": "温迪"
        },
        {
            "name": "可莉"
        },]
    },
    {
        name: '角色-璃月港', children: [{
            "name": "重云"
        },
        {
            "name": "魈"
        },
        {
            "name": "北斗"
        },
        {
            "name": "凝光"
        },
        {
            "name": "香菱"
        },
        {
            "name": "行秋"
        },
        {
            "name": "刻晴"
        },
        {
            "name": "七七"
        },
        {
            "name": "钟离"
        },
        {
            "name": "辛焱"
        },
        {
            "name": "甘雨"
        },
        {
            "name": "胡桃"
        },
        {
            "name": "烟绯"
        },
        {
            "name": "申鹤"
        },
        {
            "name": "云堇"
        },]
    },
    {
        name: '角色-稻妻城', children: [{
            "name": "枫原万叶"
        },
        {
            "name": "神里绫华"
        },
        {
            "name": "宵宫"
        },
        {
            "name": "早柚"
        },
        {
            "name": "雷电将军"
        },
        {
            "name": "九条裟罗"
        },
        {
            "name": "珊瑚宫心海"
        },
        {
            "name": "托马"
        },
        {
            "name": "五郎"
        },
        {
            "name": "荒泷一斗"
        },
        {
            "name": "八重神子"
        },]
    },
    {
        name: '角色-愚人众', children: [{
            "name": "达达利亚"
        },]
    },
    {
        name: '数码百货', children: [{
            "name": "挂件摆件"
        },
        {
            "name": "毛绒玩偶"
        },
        {
            "name": "数码3c"
        },
        {
            "name": "日用百货"
        },]
    },
    { name: '模玩手办' },
]
const categores2: Array<category> = [
    {
        name: '服饰', children: [
            {
                "name": "T恤"
            },
            {
                "name": "运动服"
            }]
    }
]
const emit = defineEmits(['category-change'])
const handleToCategory = (category: string) => {
    emit('category-change', category)
}
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
.slider_item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
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
.hidden {
    display: none;
}
.left,
.right {
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
.left:hover,
.right:hover {
    background-color: #ff6d6d;
}
.left.disable,
.right.disable {
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
