<script setup lang="ts">
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="btn-container">
    <button
      :class="{
        'main-product-color': content.color === 'main-product-color',
        'main-color': content.color === 'main-color',
        'match-color': content.color === 'match-color',
      }"
    >
      {{ content.text }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.btn-container {
    width: 40%;

  }
  button {
    outline: none;
    border: none;
    width: 100%;
    border-radius: 2rem;
    color: var(--white-color);
    font-weight: 500;
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0.6rem 0;
  }

  .main-product-color {
    background-color: var(--main-product-color);
    transition-duration: 0.2s;

    &:hover {
      background-color: var(--match-color);
      transition-duration: 0.2s;
    }
  }

  .main-color {
    background-color: var(--main-color);
  }

  .match-color {
    background-color: var(--match-color);
  }
</style>
