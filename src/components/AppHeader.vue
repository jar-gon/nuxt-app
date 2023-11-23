<template>
  <nav class="nav">
    <nuxt-link v-for="menu in menus" :key="menu._id" :to="menu.path">{{ menu.name }}</nuxt-link>
  </nav>
</template>

<script setup lang="ts">
const { data: menus } = await useMenus();
</script>

<style lang="stylus">
.nav
  display flex
  align-items center
  justify-content space-around
  padding 20px 0
</style>
