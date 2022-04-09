<template>
    <main class="container">
        <CategoryNavbar></CategoryNavbar>
        <GoodsContent></GoodsContent>
    </main>
</template>

<script setup lang="ts">
import CategoryNavbar from '../../components/CategoryNavbar/CategoryNavbar.vue'
import GoodsContent from './GoodsContent/GoodsContent.vue'
// import { reactive, provide } from 'vue'
// interface Category {
//     id: number
//     parentId: number
//     name: string
//     children?: Array<Category>
// }
// type Categories = Category[]
// const categories = reactive<Categories>([])
// provide('categories', categories)

// const handleCategoryChange = (data: Categories) => {
//     categories.length = 0
//     categories.push(...data)
// }
</script>

<style scoped>
.container {
    width: 100%;
    padding: 0;
    margin-bottom: 24px;
}
</style>