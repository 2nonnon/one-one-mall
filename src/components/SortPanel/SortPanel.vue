<template>
  <div class="sort_panel">
    <div
      class="sort_item"
      :class="{ sort_active: current === item.sort }"
      v-for="(item, i) in sorts"
      :key="i"
      @click="handleClick(item.sort)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
enum Sort {
  TIME = 'time',
  SOLED = 'soled',
  PRICE = 'price',
  PRICE_DES = '-price'
}
interface item {
  name: string
  sort: Sort
}
const sorts: item[] = [
  { name: '新上市', sort: Sort.TIME },
  { name: '畅销', sort: Sort.SOLED },
  { name: '价格', sort: Sort.PRICE }
]
const current = ref(Sort.TIME)
const route = useRoute()
const handleClick = (sort: Sort) => {
  current.value = sort
  const query = {} as { categoryId?: string; sort: Sort }
  if (route.query.categoryId)
    query.categoryId = route.query.categoryId as string
  query.sort = sort
  router.replace({
    path: '/main',
    query: query
  })
}
onMounted(() => {
  if (route.query.sort) {
    current.value = route.query.sort as Sort
  }
})
</script>

<style scoped>
.sort_panel {
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
.sort_item {
  position: relative;
  padding: 0 30px;
  transition: all 150ms ease-in;
  cursor: pointer;
}
.sort_active {
  color: #ff6d6d;
}
.sort_item:not(:first-child)::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 1px;
  height: 12px;
  background: #eff1f4;
  transform: translateY(-50%);
}
</style>
