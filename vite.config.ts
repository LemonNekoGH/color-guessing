import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import unoTransformer from '@unocss/transformer-directives'

export default defineConfig({
  plugins: [
    vue(),
    unocss({
      transformers: [
        unoTransformer({
          applyVariable: ['--uno'],
        }),
      ],
    }),
  ],
})
