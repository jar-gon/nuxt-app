<template>
  <div>关于 hello</div>
</template>

<script setup>
useHead({ title: '关于' });
definePageMeta({
  middleware: ['auth'],
});
</script>
