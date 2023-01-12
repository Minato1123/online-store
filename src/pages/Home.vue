<script setup lang="ts">
import _ from 'lodash-es'
import slidePicture from '../assets/json/slides.json'
import Slide from '../components/Slide.vue'
import type { SlideType } from '@/types'
import PMain from '@/components/PMain.vue'

// 視窗寬度
const windowWidth = ref(window.innerWidth)

function getWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() =>
  window.addEventListener('resize', getWidth),
)

onUnmounted(() =>
  window.removeEventListener('resize', getWidth),
)

const slideHeight = ref<string>('')
const slideImgs = ref<string[]>([])
watch(windowWidth, () => {
  const tempSlides = []
  for (let i = 0; i < slidePicture.length; i++) {
    if (windowWidth.value > 991) {
      tempSlides.push(slidePicture[i].imageUrl)
      slideHeight.value = '41.6666666667%'
    }
    else if (windowWidth.value > 575) {
      tempSlides.push(slidePicture[i].imageTabletUrl)
      slideHeight.value = '58.52%'
    }

    else {
      tempSlides.push(slidePicture[i].imageMobileUrl)
      slideHeight.value = '104%'
    }
  }
  slideImgs.value = tempSlides
}, { immediate: true })

const slidesConfig = computed<SlideType>(() => {
  return {
    slides: slideImgs.value ?? [],
    height: slideHeight.value,
    hasPage: true,
    hasTimeInterval: true,
    btnColor: 'white',
  }
})
</script>

<template>
  <div class="home-container">
    <Slide :slides-config="slidesConfig" />
    <PMain />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
