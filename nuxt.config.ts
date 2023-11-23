// https://nuxt.com/docs/api/configuration/nuxt-config
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

// 解除监听器数量限制
require('events').EventEmitter.defaultMaxListeners = 0;

export default defineNuxtConfig({
  app: {
    baseURL: '/nuxtApp/',
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  css: ['~/assets/style/base.css', '~/assets/style/index.styl'],

  devServer: {
    port: 3000,
    host: 'b.zmlearn.com',
    https: { key: 'ssl/server.key', cert: 'ssl/server.pem' },
  },

  devtools: { enabled: false },

  // experimental: {
  //   inlineSSRStyles: false,
  // },
  modules: ['@vant/nuxt', 'nuxt-mongoose'],

  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
      },
    },
  },

  postcss: {
    plugins: {
      autoprefixer: { overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8'] },
    },
  },

  runtimeConfig: {
    // 只在服务器端可用的私有键，会被.env覆盖
    apiSecret: process.env.NUXT_API_SECRET,
    // public中的键也可以在客户端使用
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  srcDir: 'src/',

  vite: {
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            mediaQuery: false, // 允许在媒体查询中转换`px`
            exclude: /node_modules/,
            include: /src/,
          }),
          // 针对 Vant UI 组件库
          postcsspxtoviewport8plugin({
            viewportWidth: 375,
            // eslint-disable-next-line no-useless-escape
            include: /node_modules[\\\/]vant/,
            exclude: /src/,
          }),
        ],
      },
    },
  },

  compatibilityDate: '2024-07-30',
});
