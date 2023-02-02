<script lang="ts" setup>
import IconArrowCircleUpOutlineRounded from '~icons/material-symbols/arrow-circle-up-outline-rounded'

const { y } = useWindowScroll()
const distanceToTop = computed(() => y.value)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition>
    <button
      v-if="distanceToTop > 200" class="top-btn" @click="scrollToTop"
    >
      <IconArrowCircleUpOutlineRounded />
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
  .top-btn {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.show {
      display: block;
    }

    &.hide {
      display: none;
    }

    &:hover {
      opacity: 0.6;
    }

    .svg-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      color: var(--main-color);
      box-shadow: 0px 1px 0 2px rgba(0, 0, 0, 0.1);
      background-color: var(--white-color);
    }
  }
</style>
