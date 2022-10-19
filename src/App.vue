<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Nav class="nav" />
  <div class="content">
    <RouterView />
  </div>
  <Footer class="footer" />
</template>

<style scoped lang="scss">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.content {
  margin-top: 5rem;
  min-height: calc(100vh - 21rem);
}

@media screen and (max-width: 768px) {
  .content {
    margin-top: 3rem;
  }
}
</style>
