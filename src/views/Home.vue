<template>
<div class="container">
    <Header></Header>
    <router-view />
    <LoginDialog></LoginDialog>
</div>
</template>

<script setup lang="ts">
import Header from '../components/Header/Header.vue'
import LoginDialog from '../components/Login/LoginDialog.vue'
</script>
