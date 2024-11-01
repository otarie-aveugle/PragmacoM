import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.config.globalProperties.$filters = {
  /**
   * Truncate a text to a specified length and add ellipsis if it exceeds that length.
   * @param {string} text - The text to be truncated.
   * @param {number} maxLength - The maximum number of characters allowed.
   * @returns {string} - The truncated text with ellipsis if necessary.
   */
  truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  },
}
