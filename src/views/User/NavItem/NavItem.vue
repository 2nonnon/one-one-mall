<template>
    <div class="nav_item" @click="handleChangeSubView(path)">
        <div class="nav_icon">
            <slot></slot>
        </div>
        {{ name }}
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
interface NavItem {
    name: string
    path: string
}
defineProps<NavItem>()
const handleChangeSubView = (path: string) => {
    console.log(path)
}
</script>

<style scoped>
.nav_item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #16162e;
    cursor: pointer;
}

.nav_item:hover {
    color: #ff6d6d;
}

.nav_item.active {
    color: #ff6d6d;
}

.nav_item:not(:first-child) {
    margin-top: 26px;
}

.nav_icon {
    width: 16px;
    height: 16px;
    font-size: 16px;
    flex-shrink: 0;
    margin-right: 8px;
}
</style>