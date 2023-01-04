<script setup lang="ts">
import type { PropType } from 'vue'
import { getPublicImgSrc } from '@/utils'
import type { SlideType } from '@/types'

const props = defineProps(
  {
    slidesConfig: {
      type: Object as PropType<SlideType>,
      required: true,
    },
    selectedPage: {
      type: Number,
      default: undefined,
    },
  },
)

const emit = defineEmits(['update:selectedPage'])

const currentPage = ref(0)

const currentSlideIndex = computed({
  get() {
    if (props.selectedPage === undefined)
      return currentPage.value

    return props.selectedPage
  },
  set(value) {
    if (props.selectedPage === undefined)
      currentPage.value = value
    emit('update:selectedPage', value)
  },
})

const numOfSlides = computed(() => props.slidesConfig.slides.length)

function handleNextSlide() {
  if (currentSlideIndex.value === numOfSlides.value - 1)
    currentSlideIndex.value = 0
  else currentSlideIndex.value += 1
}

function handlePreviousSlide() {
  if (currentSlideIndex.value === 0)
    currentSlideIndex.value = numOfSlides.value - 1
  else currentSlideIndex.value -= 1
}

if (props.slidesConfig.hasTimeInterval) {
  let slideInterval = setInterval(handleNextSlide, 5000)
  onBeforeUnmount(() => clearInterval(slideInterval))

  watch(
    currentSlideIndex,
    () => {
      clearInterval(slideInterval)
      slideInterval = setInterval(handleNextSlide, 5000)
    },
  )
}
</script>

<template>
  <div class="slides-block" :style="`--height: ${slidesConfig.height}`">
    <div class="slides">
      <img
        v-for="(slide, i) in slidesConfig.slides"
        :key="`slide-${i}`"
        :src="getPublicImgSrc(slide)"
        alt="images"
        class="slide-desktop"
      >
    </div>
    <div
      class="slide-btn left-btn" :class="{
        white: slidesConfig.btnColor === 'white',
        black: slidesConfig.btnColor === 'black',
      }" @click="handlePreviousSlide"
    >
      <icon-ic-twotone-keyboard-arrow-left />
    </div>
    <div
      class="slide-btn right-btn" :class="{
        white: slidesConfig.btnColor === 'white',
        black: slidesConfig.btnColor === 'black',
      }" @click="handleNextSlide"
    >
      <icon-ic-outline-chevron-right />
    </div>
    <div v-if="slidesConfig.hasPage" class="slide-pages">
      <div
        v-for="(slide, i) in slidesConfig.slides" :key="`slide-${i}`"
        class="slide-page-point"
        :class="{
          active: i === currentSlideIndex,
        }"
        @click="currentSlideIndex = i"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slides-block {
  width: 100%;
  padding-top: var(--height);
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  user-select: none;

  .slides {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(calc(v-bind(currentSlideIndex) * -100%), 0, 0);
    transition: transform 0.5s ease-in-out;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
    }
  }

  .slide-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.white {
      color: var(--white-color);
    }

    &.black {
      color: rgba(0, 0, 0, 0.2);
    }

    .svg-icon {
      width: 4rem;
      height: 4rem;
    }

    &:hover {
      opacity: 1;
    }

    &.left-btn {
      left: 0;
    }

    &.right-btn {
      right: 0;
    }
  }

  .slide-pages {
    position: absolute;
    bottom: 2%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translate(-50%, 0%);

    .slide-page-point {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background-color: var(--white-color);
      margin: 0 0.5rem;
      opacity: 0.6;
      cursor: pointer;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);

      &.active {
        background-color: var(--match-color);
      }

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
