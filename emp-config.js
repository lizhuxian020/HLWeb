import Vue3 from '@empjs/plugin-vue3'
import {defineConfig} from '@empjs/cli'
import path from 'path'


export default defineConfig(({mode, env}) => {
  return {
    plugins: [Vue3()],
    appEntry: 'main.ts',
    server: {
      port: 9001,
      proxy: [
        {
          context: ['/'],
          target: 'http://localhost:8080',
          changeOrigin: true,
          // pathRewrite: { '^/api': '/' },
        }
      ]
    },
    html: {title: '横岭系统管理平台'},
    empShare: {
      name: 'vue3Base',
      shared: {
        vue: {
          requiredVersion: '^3',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },

    css: {
      loaderOptions: {
        less: {
          additionalData: `@import "@/assets/css/variable.less";`,
        },
      },
    },
  }
})
