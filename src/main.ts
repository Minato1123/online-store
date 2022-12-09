import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import App from './App.vue'
import router from './router'
import 'floating-vue/dist/style.css'

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
    'unlogin-tooltip': {
      $extend: 'tooltip',
      placement: 'bottom',
      triggers: ['hover', 'touch'],
    },
    'login-tooltip': {
      $extend: 'menu',
      placement: 'bottom',
      triggers: ['hover', 'touch'],
    },
  },
})

app.mount('#app')

