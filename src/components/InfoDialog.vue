<script setup lang="ts">
import type { PropType } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { useScrollLock } from '@vueuse/core'
import PButton from './PButton.vue'
import type { BtnType, InfoType } from '@/types'

const props = defineProps({
  textInDialog: {
    type: Object as PropType<InfoType>,
    required: true,
  },
})

const emit = defineEmits(['closeInfoDialog'])

const isBackgroundLocked = useScrollLock(window.document.body)

function closeInfoDialog() {
  emit('closeInfoDialog')
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    closeInfoDialog()
}, false)

onMounted(() => {
  isBackgroundLocked.value = true
})

onBeforeUnmount(() => {
  isBackgroundLocked.value = false
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div class="mask">
        <OnClickOutside
          class="info-container" :class="{
            'border-main-color': textInDialog.borderColor === 'main-color',
            'border-main-product-color': textInDialog.borderColor === 'main-product-color',
          }" @trigger="closeInfoDialog"
        >
          <div class="text">
            <div
              class="title"
              :class="{
                'text-main-color': textInDialog.color === 'main-color',
                'text-main-product-color': textInDialog.color === 'main-product-color',
              }"
            >
              <Component :is="textInDialog.iconBeforeText" />
              <span>{{ textInDialog.text }}</span>
            </div>
            <div
              class="addition-text" :class="{
                'text-main-color': textInDialog.color === 'main-color',
                'text-main-product-color': textInDialog.color === 'main-product-color',
              }"
            >
              {{ textInDialog.additionalText }}
            </div>
          </div>
          <div v-if="textInDialog.textInBtnNO || textInDialog.textInBtnOK" class="btns">
            <PButton v-if="textInDialog.textInBtnNO" class="btn" :content="textInDialog.textInBtnNO" @click="closeInfoDialog" />
            <PButton v-if="textInDialog.textInBtnOK" class="btn" :content="textInDialog.textInBtnOK" @click="closeInfoDialog" />
          </div>
        </OnClickOutside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;

  .info-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    background-color: var(--white-color);
    border-radius: 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.border-main-color {
      border: 0.2rem solid var(--main-color);
    }

    &.border-main-product-color {
      border: 0.2rem solid var(--main-product-color);
    }

    .text {
      width: 100%;
      padding: 2rem 0;

      .title {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: 500;

        &.text-main-color {
          color: var(--main-color);
        }

        &.text-main-product-color {
          color: var(--main-product-color);
        }
      }

      .addition-text {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;

        &.text-main-color {
          color: var(--main-color);
        }

        &.text-main-product-color {
          color: var(--main-product-color);
        }
      }

    }

    .btns {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1rem;

      .btn {
        width: 40%;
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.6s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
