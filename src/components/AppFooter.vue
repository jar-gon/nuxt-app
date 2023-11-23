<template>
  <div class="footer">my footer</div>
</template>

<script setup lang="ts">
const businessApi = useBusinessApi();

onMounted(async () => {
  await nextTick();

  try {
    const data = await hasPermission(businessApi);
    console.info('接口返回值：', data);
  } catch (error) {
    console.info('权限接口请求失败：', error);
  }
});
</script>

<style lang="stylus">
.footer
  padding 20px 0
</style>
