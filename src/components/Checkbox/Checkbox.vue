<template>
    <div class="checkbox_item">
        <label class="check_label" @click="handleUpdate(checkbox)">
            <input type="checkbox" ref="checkbox" :checked="checked" />
            <span class="check_icon">v</span>
        </label>
        <span class="check_text" v-if="text">{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect, defineEmits } from 'vue'

type Props = {checked:boolean, text?:string}
defineProps<Props>()

const checkbox = ref<HTMLInputElement>()
watchEffect(() => {
    console.log(checkbox.value?.checked)
})

const emit = defineEmits(['update:checked'])
const handleUpdate = (checkbox: HTMLInputElement | undefined) => {
    emit('update:checked', checkbox?.checked)
}
</script>

<style scoped>
.checkbox_item {
    width: 40px;
    display: flex;
    align-items: center;
}
.check_label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}
.check_label input {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    pointer-events: none;
}
.check_icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #c5c5cb;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    color: #eff1f4;
    cursor: pointer;
}
input:checked + .check_icon {
    border-color: #ff6d6d;
    background: #ff6d6d;
    color: #fff;
}
.check_text {
    margin-left: 11px;
}
</style>