// https://nuxt.com/docs/api/configuration/nuxt-config
import { EventEmitter } from 'node:events';
import autoprefixer from 'autoprefixer';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

// 解除监听器数量限制
EventEmitter.defaultMaxListeners = 0;

const apiProxyTarget = process.env.NUXT_PUBLIC_API_BASE;

const getViewportWidth = (filePath: string) => {
  const normalizedPath = filePath.replaceAll('\\', '/');

  if (normalizedPath.includes('/node_modules/vant/')) {
    return 375;
  }

  if (normalizedPath.includes('/src/')) {
    return 750;
  }

  return undefined;
};

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

  dir: {
    public: 'src/public',
  },

  // experimental: {
  //   inlineSSRStyles: false,
  // },
  modules: ['@vant/nuxt', 'nuxt-mongoose', '@nuxt/eslint'],

  nitro: apiProxyTarget
    ? {
        devProxy: {
          '/api/zmbiz': {
            target: apiProxyTarget,
            changeOrigin: true,
          },
        },
      }
    : undefined,

  runtimeConfig: {
    // 只在服务器端可用的私有键，会被.env覆盖
    apiSecret: process.env.NUXT_API_SECRET,
    // public中的键也可以在客户端使用
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  srcDir: 'src/',
  serverDir: 'src/server',

  vite: {
    build: {
      target: ['chrome100', 'safari15'],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          postcsspxtoviewport8plugin({
            viewportWidth: getViewportWidth,
            selectorBlackList: [],
            mediaQuery: false,
          }),
        ],
      },
    },
  },

  compatibilityDate: '2024-07-30',
});
