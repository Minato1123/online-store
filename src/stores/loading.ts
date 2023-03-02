import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const numOfLoading = ref(0)
  const isDuringMinWaitingTime = ref(false)
  let timeOutFn: ReturnType<typeof setTimeout>

  const isLoading = computed(() => numOfLoading.value > 0 || isDuringMinWaitingTime.value)

  function startLoading() {
    if (numOfLoading.value <= 0) {
      stopWaitingTime()
      isDuringMinWaitingTime.value = true
      startWaitingTime()
    }

    numOfLoading.value += 1
  }

  function endLoading() {
    numOfLoading.value -= 1
    if (numOfLoading.value < 0)
      numOfLoading.value = 0
  }

  function startWaitingTime() {
    timeOutFn = setTimeout(() => { isDuringMinWaitingTime.value = false }, 300)
  }

  function stopWaitingTime() {
    clearTimeout(timeOutFn)
  }

  return {
    isLoading,
    startLoading,
    endLoading,
  }
})
