<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import MenuMobile from './components/MenuMobile.vue'
import Footer from './components/Footer.vue'

const isOpenMenu = ref(false)
</script>

<template>
  <Nav class="nav" @toggle-menu="isOpenMenu = !isOpenMenu" />
  <MenuMobile :is-open-menu="isOpenMenu" @close-menu="isOpenMenu = false" />
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
  z-index: 2;
}

.content {
  margin-top: 5rem;
  min-height: calc(100vh - 21rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFBF4;
}

@media screen and (max-width: 1090px) {
  .content {
    margin-top: 3rem;
  }

}
</style>
