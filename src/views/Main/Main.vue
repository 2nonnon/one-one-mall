<template>
    <main class="container">
        <CategoryNavbar @category-change="handleCategoryChange"></CategoryNavbar>
        <GoodsContent></GoodsContent>
    </main>
</template>

<script setup lang="ts">
import CategoryNavbar from '../../components/CategoryNavbar/CategoryNavbar.vue'
import GoodsContent from '../../components/GoodsContent/GoodsContent.vue'
import { ref, provide } from 'vue'

const currentCategory = ref<string>('全部商品')

provide('currentCategory', currentCategory)

const handleCategoryChange = (category: string) => {
    currentCategory.value = category
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 0;
    margin-bottom: 24px;
}
</style>