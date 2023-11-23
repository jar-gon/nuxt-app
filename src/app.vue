<template>
  <NuxtLayout class="layout">
    <NuxtLoadingIndicator style="opacity: 1" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const appConfig = useAppConfig();
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} - ${appConfig.title}` : appConfig.title;
  },
  meta: [{ name: 'description', content: appConfig.description }],
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
