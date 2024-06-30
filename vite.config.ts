import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
import AutoImport  from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { alias } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      AutoImport({
        dts: 'src/types/auto-import.d.ts',
        imports: ['vue', 'vue-router'],
        resolvers: [AntDesignVueResolver()]
      }),
      Components({
        deep: true,
        dts: 'src/types/auto-components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ],
        exclude: [/[\\/]node_modules[\\/]/]
      }) 
    ],
    resolve: {
      alias
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnable: true,
          additionalData: '@use "@/styles/var.scss" as *;'
        }
      }
    }
  }
})
