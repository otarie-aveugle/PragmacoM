/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        pragmacom_theme: {
          'base-100': '#f6f2f2', //background
          'base-content': '#2C2E33', //text
          primary: '#26358A',
          secondary: '#272C4A',
          neutral: '#4D4D4D',
          '.btn-primary': {
            color: '#F6F2F2',
          },
        },
      },
    ],
  },
}
