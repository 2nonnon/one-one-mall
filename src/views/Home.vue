<template>
<div class="container">
    <Header></Header>
    <router-view />
    <Login></Login>
</div>
</template>

<script setup lang="ts">
import Header from '../components/Header/Header.vue'
import Login from '../components/Login/Login.vue'
</script>
