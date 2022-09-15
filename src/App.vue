<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>

<template>
  <Nav class="nav" />
  <RouterView />
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  position: fixed;
}
</style>
