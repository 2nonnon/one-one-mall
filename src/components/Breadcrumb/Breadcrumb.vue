<template>
    <div class="breadcrumb">
        <div class="bc_item" @click="handleToHome">首页</div>
        <div class="bc_item" @click="handleToHome" v-if="categories.length === 0">{{ defaultText }}</div>
        <div
            class="bc_item"
            v-for="item in categories"
            :key="item.id"
            @click="handleChangeCategory(item.id)"
        >{{ item.name }}</div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { emitter } from '@/util/emitter';
import { reactive, defineProps } from 'vue';

defineProps<{ defaultText: string }>()

interface Category {
    id: number
    parentId: number
    name: string
    children?: Array<Category>
}

// type Categories = Category[]
// const categories = inject<Ref<Categories>>('categories', ref<Categories>([]))

const categories = reactive<Category[]>([])

emitter.on('category-change', (data) => {
    categories.length = 0
    categories.push(...data)
})

const handleToHome = (): void => {
    categories.length = 0
    router.push({
        name: 'Home'
    })
}
const handleChangeCategory = (id: number) => {
    categories.pop()
    router.push({
        path: '/main',
        query: {
            categoryId: id
        }
    })
}
</script>

<style scoped>
.breadcrumb {
    padding: 12px 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.bc_item {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #9696a1;
}
.bc_item:not(:last-child) {
    cursor: pointer;
}
.bc_item:not(:first-child):before {
    margin-right: 12px;
    content: ">";
    font-size: 14px;
    color: #9696a1;
}
.bc_item:not(:first-child) {
    margin-left: 12px;
}
.bc_item:last-child {
    color: #ff6d6d;
    cursor: default;
    pointer-events: none;
}
.bc_item:hover {
    color: #ff6d6d;
}
</style>