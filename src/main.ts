import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import { defaultConfig, plugin } from '@formkit/vue'
import App from './App.vue'
import router from './router'
import { useMockDataStore } from './stores/mock'
import DisableAutocomplete from '@/plugins/disable-autocomplete'
import 'floating-vue/dist/style.css'
import '@formkit/themes/genesis'

const app = createApp(App)

app.use(createPinia())
app.use(router)
FloatingVue.options.themes.tooltip.distance = 12
FloatingVue.options.themes.tooltip.arrowPadding = 10
app.use(FloatingVue, {
  themes: {
    'register-validate-tooltip': {
      $extend: 'tooltip',
      placement: 'bottom-end',
      triggers: [],
      hideTriggers: [],
    },
    'nav-tooltip': {
      $extend: 'dropdown',
      placement: 'bottom',
      triggers: ['hover'],
      popperTriggers: ['hover'],
    },
  },
}).use(DisableAutocomplete)

app.use(plugin, defaultConfig)

useMockDataStore()
if (useMockDataStore().isMocked) {
  until(() => useMockDataStore().isMockDataReady).toBeTruthy()
    .then(() => {
      app.mount('#app')
    })
}
else {
  app.mount('#app')
}

