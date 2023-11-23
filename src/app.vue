<template>
  <nuxt-layout class="layout">
    <nuxt-loading-indicator style="opacity: 1" />
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup>
import { joinURL } from 'ufo';

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} - ${appConfig.title}` : appConfig.title;
  },
  meta: [{ name: 'description', content: appConfig.description }],
  link: [{ rel: 'icon', type: 'image/x-icon', href: joinURL(runtimeConfig.app.baseURL, 'favicon.ico') }],
});
</script>

<style>
.layout {
  padding: 0 16px;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
