<template>
    <div class="paginate">
        <div
            :class="[{ paginate_nav: true, hidden: currentPage <= 1 }]"
            @click="handleClick(currentPage - 1)"
        >&lt;</div>
        <div
            v-for="i in pages"
            :key="i"
            :class="[{ paginate_item: true }, { page_active: i === currentPage }]"
            @click="handleClick(i)"
        >{{ i }}</div>
        <div
            :class="[{ paginate_nav: true, hidden: currentPage >= pages }]"
            @click="handleClick(currentPage + 1)"
        >&gt;</div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
type Props = {
    total: number
    pageSize: number
    currentPage: number
    pages: number
}
defineProps<Props>()
const emit = defineEmits(['page-change'])
const handleClick = (next: number) => {
    emit('page-change', next)
}
</script>

<style scoped>
.paginate {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
}
.paginate > * + * {
    margin-left: 16px;
}
.paginate_item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    color: #16162e;
    background: #fff;
    border: 1px solid #c5c5cb;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.245s;
}
.page_active {
    color: #fff;
    background: #ff6d6d;
    border-color: #ff6d6d;
}
.paginate_nav {
    width: 20px;
    height: 20px;
    background-color: rgb(243, 243, 244);
    color: #86909c;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.paginate_nav.hidden {
    opacity: 0;
    pointer-events: none;
}
.paginate_nav:hover {
    color: #fff;
    background: #ff6d6d;
}
</style>