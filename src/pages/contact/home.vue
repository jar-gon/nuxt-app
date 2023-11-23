<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.back()" />
    <div class="header">
      <van-button block to="/contact/add">add</van-button>
    </div>
    <van-list>
      <van-cell v-for="item in Menus" :key="item._id" :title="item.name">
        <template #value>
          <van-button size="small" :to="{ path: '/contact/add', query: { id: item._id } }">edit</van-button>
          <van-button size="small" @click="handleDelete(item)">delete</van-button>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup>
useHead({ title: '联系' });
definePageMeta({
  layout: 'custom',
});

const { data: Menus, refresh: refreshList } = await useFetch('/api/menus');

const handleDelete = item => {
  useFetch(`/api/menus/${item._id}`, {
    method: 'DELETE',
  });
  refreshList();
};
</script>

<style lang="stylus" scoped>
.header
  margin 10px 0
</style>
