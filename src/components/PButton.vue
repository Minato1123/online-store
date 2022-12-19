<script setup lang="ts">
import type { PropType } from 'vue'
import type { BtnType } from '@/types'

defineProps({
  content: {
    type: Object as PropType<BtnType>,
    required: true,
  },
})
</script>

<template>
  <button
    :class="{
      'main-product-color': content.color === 'main-product-color',
      'main-color': content.color === 'main-color',
      'match-color': content.color === 'match-color',
    }"
  >
    <Component :is="content.beforeTextIcon" />
    {{ content.text }}
    <Component :is="content.afterTextIcon" />
  </button>
</template>

<style scoped lang="scss">
  button {
    outline: none;
    border: none;
    width: 100%;
    border-radius: 2rem;
    color: var(--white-color);
    font-weight: 500;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.6rem 0;
    box-shadow: 1px 1px 1px 1px rgba($color: #000000, $alpha: 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .main-product-color {
    background-color: var(--main-product-color);
    transition-duration: 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .main-color {
    background-color: var(--main-color);
    transition-duration: 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .match-color {
    background-color: var(--match-color);
    transition-duration: 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
</style>
