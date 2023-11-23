<template>
  <div>
    <van-nav-bar left-arrow left-text="返回" title="标题" @click-left="$router.back()" />
    <div class="header">
      <van-button block to="/contact/add">add</van-button>
    </div>
    <van-list>
      <van-cell v-for="item in menus" :key="item._id" :title="item.name">
        <template #value>
          <van-button size="small" :to="{ path: '/contact/add', query: { id: item._id } }">edit</van-button>
          <van-button :loading="deletingIds.has(item._id)" size="small" @click="handleDelete(item)">delete</van-button>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '#shared/types/menu';
import { showFailToast } from 'vant';

useHead({ title: '联系' });
definePageMeta({
  layout: 'custom',
});

const { data: menus, refresh: refreshList } = await useMenus();
const deletingIds = reactive(new Set<string>());

const handleDelete = async (item: Menu) => {
  if (deletingIds.has(item._id)) {
    return;
  }

  deletingIds.add(item._id);

  try {
    await deleteMenu(item._id);
    await refreshList();
  } catch (error) {
    showFailToast(getRequestErrorMessage(error, '删除失败'));
  } finally {
    deletingIds.delete(item._id);
  }
};
</script>

<style lang="stylus" scoped>
.header
  margin 10px 0
</style>
