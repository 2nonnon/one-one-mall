<template>
    <div class="loading" :class="{ active: isLoading }">
        <slot v-if="!isLoading"></slot>
        <div class="loading__content" v-if="isLoading">
            <div class="loading__gap-top"></div>
            <img src="/Status/loadingContent.b207a25.gif" alt="">
            <p class="loading__title">加载中...</p>
            <div class="loading__gap-bottom"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ isLoading: boolean }>()
</script>

<style scoped>
.loading {
    position: relative;
    min-height: 260px;
}

.active {
    width: 100%;
    height: 100%;
}

.loading__content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.loading__content img {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 160px;
    height: 160px;
}

.loading__gap-top {
    flex: 1 0 42px;
    max-height: 130px;
}

.loading__title {
    margin-top: 12px;
}

.loading__gap-bottom {
    flex: 10 0 42px;
}
</style>