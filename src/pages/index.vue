<template>
  <div>
    <div>hello</div>
    <div>
      {{ counter }}
      <van-button @click="counter++">+</van-button>
    </div>
  </div>
</template>

<script setup>
const counter = useCounter();
</script>
