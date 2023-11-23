<template>
  <div>
    <van-nav-bar left-arrow left-text="返回" title="标题" @click-left="goBack" />
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="dataForm.name" label="导航" name="name" placeholder="导航" :rules="[{ required: true, message: '请填写导航名' }]" />
          <van-field v-model="dataForm.path" label="路由地址" name="path" placeholder="路由地址" :rules="[{ required: true, message: '请填写路由地址' }]" />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button block :loading="isSubmitting" native-type="submit" round type="primary">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu, MenuPayload } from '#shared/types/menu';
import { showFailToast } from 'vant';

useHead({ title: '添加' });
definePageMeta({
  layout: 'custom',
});

const route = useRoute();
const router = useRouter();
const menuId = typeof route.query.id === 'string' ? route.query.id : undefined;

const dataForm = reactive<MenuPayload>({
  name: '',
  path: '',
});
const isSubmitting = ref(false);

if (menuId) {
  const { data, error } = await useFetch<Menu>(`/api/menus/${menuId}`, {
    key: `menu-${menuId}`,
    method: 'GET',
  });

  if (error.value) {
    showFailToast(getRequestErrorMessage(error.value, '获取菜单失败'));
  } else {
    dataForm.name = data.value?.name ?? '';
    dataForm.path = data.value?.path ?? '';
  }
}

const goBack = () => {
  router.back();
};

const onSubmit = async () => {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = { ...dataForm };

    if (menuId) {
      await updateMenu(menuId, payload);
    } else {
      await createMenu(payload);
    }

    await refreshNuxtData('menus');
    goBack();
  } catch (error) {
    showFailToast(getRequestErrorMessage(error, '提交失败'));
  } finally {
    isSubmitting.value = false;
  }
};
</script>
