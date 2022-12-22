import type { Plugin } from 'vue'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function handleFocus(this: HTMLInputElement) {
  this.blur()
  this.removeEventListener('focus', handleFocus)
  await delay(0)
  this.focus()
  this.addEventListener('focus', handleFocus)
}

async function handlePointerDown(this: HTMLInputElement) {
  this.blur()
  await delay(0)
  this.removeEventListener('focus', handleFocus)
  this.addEventListener('focus', handleFocus)
  this.focus()
}

const plugin: Plugin = {
  install(app) {
    app.mixin({
      mounted() {
        this.disableAutoComplete()
      },

      updated() {
        this.disableAutoComplete()
      },

      methods: {
        disableAutoComplete() {
          const elements = Array.from<HTMLInputElement>(document.querySelectorAll('input[autocomplete="off"]:not([data-disable-autocomplete])'))

          if (!elements)
            return

          elements.forEach((element) => {
            element.dataset.disableAutocomplete = 'true'
            element.addEventListener('pointerdown', handlePointerDown)
            element.addEventListener('focus', handleFocus)
          })
        },
      },
    })
  },
}

export default plugin
