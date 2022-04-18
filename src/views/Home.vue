<template>
  <div class="container">
    <Header></Header>
    <router-view />
    <LoginDialog></LoginDialog>
    <BackTop></BackTop>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header/Header.vue'
import LoginDialog from '../components/Login/LoginDialog.vue'
import BackTop from '@/components/BackTop/BackTop.vue'
</script>
