import './assets/main.css'
import 'quill/dist/quill.snow.css'

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
    if (typeof text !== 'string' || text.length === 0) {
      return ''
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  },

  /**
   * Capitalize the first letter of a given text.
   * @param {string} text - The text to be capitalized.
   * @returns {string} - The text with the first letter capitalized.
   */
  capitalizeText(text) {
    if (typeof text !== 'string' || text.length === 0) {
      return ''
    }
    return text.charAt(0).toUpperCase() + text.slice(1)
  },

  /**
   * Get the first letter of a given text.
   * @param {string} text - The text to extract the first letter from.
   * @returns {string} - The first letter of the text, or an empty string if the text is empty.
   */
  getFirstLetter(text) {
    if (typeof text !== 'string' || text.length === 0) {
      return ''
    }
    return text.charAt(0)
  },
}
