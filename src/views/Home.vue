<template>
  <Header></Header>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- <Main></Main> -->
</template>

<script setup lang="ts">
import Header from '../components/Header/Header.vue'
// import Main from '../components/Main/Main.vue'
</script>