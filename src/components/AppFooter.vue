<template>
  <div class="footer">my footer</div>
</template>

<script setup>
onMounted(async () => {
  await nextTick();
  const { data } = await hasPermission();
  console.info('接口返回值：', data.value);
});
</script>

<style lang="stylus">
.footer
  padding 20px 0
</style>
