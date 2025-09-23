import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter} from '@tanstack/router-vite-plugin'


// import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), tailwindcss(),  tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  // },
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, './src'),
  //   },
  // },
})
