import { defineStore } from 'pinia'

export const useMockDataStore = defineStore('mockData', () => {
  const isMocked = ref(import.meta.env.PROD)
  const mockData = ref<any | null>(null)
  const isMockDataReady = ref(false)
  const tokenMap = new Map([])

  if (isMocked) {
    import('../assets/json/db.json')
      .then(({ default: d }) => {
        mockData.value = d
        isMockDataReady.value = true
      })
  }

  function getTimeStamp() {
    return Date.now()
  }

  function isUserTokenValid(theToken: string) {
    return tokenMap.get(theToken) != null
  }

  return {
    tokenMap,
    isMocked,
    isMockDataReady,
    mockData,
    getTimeStamp,
    isUserTokenValid,
  }
})
