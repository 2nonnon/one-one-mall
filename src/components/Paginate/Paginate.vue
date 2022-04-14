<template>
    <div class="paginate">
        <div :class="[{ paginate_nav: true, hidden: currentPage <= 1 }]" @click="handleClick(currentPage - 1)"> <svg
                t="1649936383580" class="left-icon x-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="39858">
                <path
                    d="M684.29 799.276L393.929 513.019 684.29 226.762c37.685-37.153 38.003-97.625 0.707-134.384-37.297-36.758-98.646-36.435-136.331 0.718l-357.43 352.378c-0.155 0.153-0.297 0.314-0.451 0.468-0.084 0.082-0.172 0.157-0.256 0.239-18.357 18.092-27.581 41.929-27.743 65.902-0.004 0.311-0.017 0.623-0.018 0.934 0.001 0.316 0.014 0.632 0.018 0.948 0.165 23.97 9.389 47.803 27.743 65.892 0.083 0.082 0.171 0.157 0.255 0.239 0.154 0.154 0.296 0.315 0.452 0.468l357.43 352.378c37.685 37.153 99.034 37.476 136.331 0.718 37.297-36.758 36.979-97.231-0.707-134.384z"
                    p-id="39859"></path>
            </svg></div>
        <div v-for="i in pages" :key="i" :class="[{ paginate_item: true }, { page_active: i === currentPage }]"
            @click="handleClick(i)">{{ i }}</div>
        <div :class="[{ paginate_nav: true, hidden: currentPage >= pages }]" @click="handleClick(currentPage + 1)"> <svg
                t="1649936383580" class="right-icon x-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="39858">
                <path
                    d="M684.29 799.276L393.929 513.019 684.29 226.762c37.685-37.153 38.003-97.625 0.707-134.384-37.297-36.758-98.646-36.435-136.331 0.718l-357.43 352.378c-0.155 0.153-0.297 0.314-0.451 0.468-0.084 0.082-0.172 0.157-0.256 0.239-18.357 18.092-27.581 41.929-27.743 65.902-0.004 0.311-0.017 0.623-0.018 0.934 0.001 0.316 0.014 0.632 0.018 0.948 0.165 23.97 9.389 47.803 27.743 65.892 0.083 0.082 0.171 0.157 0.255 0.239 0.154 0.154 0.296 0.315 0.452 0.468l357.43 352.378c37.685 37.153 99.034 37.476 136.331 0.718 37.297-36.758 36.979-97.231-0.707-134.384z"
                    p-id="39859"></path>
            </svg></div>
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
}

.paginate>*+* {
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