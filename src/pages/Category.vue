<script setup lang="ts">
import _ from 'lodash-es'
import PMain from '@/components/PMain.vue'

const route = useRoute()
const categoryId = computed(() => route.params.categoryId)
</script>

<template>
  <div class="home-container">
    <div class="title">
      Category
    </div>
    <PMain :link-category-id="+categoryId" />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  margin: 3rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 80%;
    margin-bottom: 1rem;
    color: var(--main-product-color);
    font-size: 1.8rem;
    text-align: center;
  }
}
</style>
