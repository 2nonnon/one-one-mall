<template>
  <div class="empty--horizontal">
    <img :src="src" alt="空" class="empty__img" />
    <span class="empty__title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
type EmptyContent = {
  src: string
  title: string
}
defineProps<EmptyContent>()
</script>

<style scoped>
.empty--horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty__img {
  width: 176px;
  height: 160px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.empty__title {
  font-size: 16px;
  color: #9696a1;
  line-height: 22px;
}
</style>
