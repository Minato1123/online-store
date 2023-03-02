<script setup lang="ts">
const isBackgroundLocked = useScrollLock(window.document.body)

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
        <div class="container">
          <div class="loadingio-spinner-interwind-0032szko1knau">
            <div class="ldio-cyicwfxrufe">
              <div><div><div><div /></div></div><div><div><div /></div></div></div>
            </div>
          </div>
          <div class="content">
            Loading...
          </div>
        </div>
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
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 10rem;
    border: 0.1rem solid var(--main-product-color);
    border-radius: 1rem;
    padding-bottom: 1rem;
    background-color: var(--white-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .content {
      color: var(--main-product-color);
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}

@keyframes ldio-cyicwfxrufe-r {
  0%, 100% { animation-timing-function: cubic-bezier(0.2 0 0.8 0.8) }
  50% { animation-timing-function: cubic-bezier(0.2 0.2 0.8 1) }
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
}
@keyframes ldio-cyicwfxrufe-s {
  0%, 100% { animation-timing-function: cubic-bezier(0.2 0 0.8 0.8) }
  50% { animation-timing-function: cubic-bezier(0.2 0.2 0.8 1) }
  0% { transform: translate(-20.55px,-20.55px) scale(0) }
  50% { transform: translate(-20.55px,-20.55px) scale(1) }
  100% { transform: translate(-20.55px,-20.55px) scale(0) }
}
.ldio-cyicwfxrufe > div { transform: translate(0px,-10.275px) }
.ldio-cyicwfxrufe > div > div {
  animation: ldio-cyicwfxrufe-r 1.3513513513513513s linear infinite;
  transform-origin: 68.5px 68.5px;
}
.ldio-cyicwfxrufe > div > div > div {
  position: absolute;
  transform: translate(68.5px, 56.17px);
}
.ldio-cyicwfxrufe > div > div > div > div {
  width: 41.1px;
  height: 41.1px;
  border-radius: 50%;
  background: var(--main-product-color);
  animation: ldio-cyicwfxrufe-s 1.3513513513513513s linear infinite;
}
.ldio-cyicwfxrufe > div > div:last-child {
  animation-delay: -0.6756756756756757s;
}
.ldio-cyicwfxrufe > div > div:last-child > div > div {
  animation-delay: -0.6756756756756757s;
  background: var(--main-color);
}
.loadingio-spinner-interwind-0032szko1knau {
  width: 137px;
  height: 137px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-cyicwfxrufe {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-cyicwfxrufe div { box-sizing: content-box; }
.ldio-0xji4dc6kkl div { box-sizing: content-box; }

.v-enter-active,
.v-leave-active {
  transition: opacity 0.6s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
