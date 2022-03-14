<template>
    <div class="breadcrumb">
        <div class="bc_item" @click="handleToHome">首页</div>
        <div class="bc_item">{{ currentCategory }}</div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref, inject, Ref } from 'vue';

const currentCategory = inject<Ref<string>>('currentCategory', ref<string>('全部商品'))

const handleToHome = (): void => {
    router.push({
        name: 'Home'
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
.bc_item:first-child {
    cursor: pointer;
}
.bc_item:last-child::before {
    margin-right: 12px;
    content: ">";
    font-size: 14px;
    color: #9696a1;
}
.bc_item:last-child {
    margin-left: 12px;
    color: #ff6d6d;
    cursor: default;
}
.bc_item:hover {
    color: #ff6d6d;
}
</style>