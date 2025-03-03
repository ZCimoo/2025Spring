<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import NotificationList from './components/NotificationList.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
<div class="container body-container">
  <NotificationList/>
  <RouterView />
</div>

  
</template>

<style>
body {
  background-color:aliceblue;
}
.body-container{
  margin-top: 20px;
  background-color: white;
}
</style>
