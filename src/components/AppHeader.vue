<template>
  <nav class="nav">
    <NuxtLink v-for="(menu, index) in Menus" :key="index" :to="menu.path">{{ menu.name }}</NuxtLink>
  </nav>
</template>

<script setup>
const { data: Menus } = await useFetch('/api/menus');
</script>

<style lang="stylus">
.nav
  display flex
  align-items center
  justify-content space-around
  padding 20px 0
</style>
