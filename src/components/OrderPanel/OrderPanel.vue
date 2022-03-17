<template>
    <div class="order_panel">
        <div
            class="order_item"
            :class="{ order_active: current === item.order }"
            v-for="item, i in orders"
            :key="i"
            @click="handleClick(item.order)"
        >{{ item.name }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
interface item {
    name: string,
    order: string
}
const orders: item[] = [
    { name: '新上市', order: 'time' }, 
    { name: '畅销', order: 'soled' }, 
    { name: '价格', order: 'price' }
]
const current = ref('time')
const emit = defineEmits(['order-change'])
const handleClick = (order: string) => {
    current.value = order
    emit('order-change', order)
}
</script>

<style scoped>
.order_panel {
    font-size: 14px;
    font-weight: 400;
    color: #16162e;
    height: 64px;
    line-height: 64px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    margin-bottom: 8px;
}
.order_item {
    position: relative;
    padding: 0 30px;
    transition: all 150ms ease-in;
    cursor: pointer;
}
.order_active {
    color: #ff6d6d;
}
.order_item:not(:first-child)::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 1px;
    height: 12px;
    background: #eff1f4;
    transform: translateY(-50%);
}
</style>