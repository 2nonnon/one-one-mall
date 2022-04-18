<template>
  <div class="input_number">
    <button :class="{ disable: modelValue <= range.min }" @click="handleDown">
      -
    </button>
    <input
      step="1"
      type="number"
      autocomplete="off"
      v-model="quantity"
      @blur="handleBlur"
    />
    <button :class="{ disable: modelValue >= range.max }" @click="handleUp">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Range {
  max: number
  min: number
}
const range: Range = { max: 50, min: 1 }

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])

const quantity = ref(props.modelValue)

const modify = () => emit('update:modelValue', quantity.value)

const handleDown = () => {
  if (quantity.value <= range.min) return
  else {
    quantity.value -= 1
    modify()
  }
}
const handleUp = () => {
  if (quantity.value >= range.max) return
  else {
    quantity.value += 1
    modify()
  }
}
const handleBlur = () => {
  if (quantity.value <= range.min) {
    quantity.value = range.min
    modify()
  } else if (quantity.value >= range.max) {
    quantity.value = range.max
    modify()
  } else {
    modify()
  }
}
</script>

<style scoped>
.input_number {
  display: inline-flex;
  align-items: stretch;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #f3f3f4;
  background-color: #fff;
}
.input_number input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 6px 7px;
  font-size: 14px;
  color: #16162e;
  line-height: 20px;
  border-left: 1px solid #f3f3f4;
  border-right: 1px solid #f3f3f4;
  border-top: none;
  border-bottom: none;
  border-radius: none;
  box-shadow: none;
  outline: none;
  appearance: none;
  text-align: center;
}
.input_number button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  color: #9696a1;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: transparent;
  vertical-align: initial;
  outline: none;
  border: none;
}
.input_number .disable {
  color: #f3f3f4;
  cursor: not-allowed;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
