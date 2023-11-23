<template>
  <div>关于 12</div>
</template>

<script setup>
useHead({ title: '关于12' });
const route = useRoute();
console.info('获取路由参数', route, route.params.id);
</script>
