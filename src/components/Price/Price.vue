<template>
  <div class="price" :style="`font-size:${numFont}px`">
    <span class="currency" :style="`font-size:${curFont}px`">{{
      priceData.currency
    }}</span>
    <span class="integer">{{ priceData.integer }}</span>
    <span class="postfix" v-if="hasFix">
      <span class="integer">{{ priceData.split }}</span>
      <span class="decimal">{{ priceData.decimal }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { Price, StringObj } from './types'
import { watchEffect, withDefaults } from 'vue'

const map: StringObj = {
  CNY: '¥',
  dash: '-',
  dot: '.'
}

const priceData: Price = {
  currency: '¥',
  integer: '0',
  split: '.',
  decimal: '00'
}

interface Props {
  currency?: string
  price: number[]
  split?: string
  range?: boolean
  hasFix?: boolean
  numFont?: number
  curFont?: number
}
const props = withDefaults(defineProps<Props>(), {
  currency: 'CNY',
  split: 'dot',
  range: false,
  hasFix: false,
  numFont: 24,
  curFont: 18
})

const parsePrice = (
  cureency: string,
  split: string,
  range: boolean,
  price: number[]
) => {
  if (price.length) {
    price.sort((a, b) => a - b)
    const max = price[price.length - 1]
    const min = price[0]
    priceData.currency = map[cureency]
    priceData.split = map[split]
    priceData.integer = min === 0 ? '0' : `${min}`.slice(0, -2)
    if (range) {
      priceData.decimal = max === 0 ? '00' : `${max}`.slice(0, -2)
    } else {
      priceData.decimal = min === 0 ? '00' : `${min}`.slice(-2)
    }
  }
}

watchEffect(() => {
  parsePrice(props.currency, props.split, props.range, props.price)
})
</script>

<style scoped>
/* .price {
    color: #ff6d6d;
    font-weight: 700;
} */
.currency {
  padding-right: 2px;
}
</style>
