<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import MenuMobile from './components/MenuMobile.vue'
import Footer from './components/Footer.vue'
import Top from './components/Top.vue'
import Loading from './components/Loading.vue'
import { useLoadingStore } from './stores/loading'

const isOpenMenu = ref(false)
const { isLoading } = storeToRefs(useLoadingStore())
</script>

<template>
  <Nav class="nav" @toggle-menu="isOpenMenu = !isOpenMenu" />
  <MenuMobile :is-open-menu="isOpenMenu" @close-menu="isOpenMenu = false" />
  <div class="content">
    <RouterView />
  </div>
  <Footer class="footer" />
  <Top class="top" />
  <Teleport to="body">
    <Transition name="loading">
      <Loading v-if="isLoading" />
    </Transition>
  </Teleport>
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
  background-color: #FFFBF4;
}

.top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 2;
}

@media screen and (max-width: 1090px) {
  .content {
    margin-top: 3rem;
  }

}
</style>
