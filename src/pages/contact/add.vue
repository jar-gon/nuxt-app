<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="goBack" />
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="dataForm.name" name="name" label="导航" placeholder="导航" :rules="[{ required: true, message: '请填写导航名' }]" />
          <van-field v-model="dataForm.path" name="path" label="路由地址" placeholder="路由地址" :rules="[{ required: true, message: '请填写路由地址' }]" />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
useHead({ title: '添加' });
definePageMeta({
  layout: 'custom',
});

const {
  query: { id },
} = useRoute();

const dataForm = reactive({
  name: '',
  path: '',
});

if (id) {
  const { data } = await useFetch(`/api/menus/${id}`, {
    method: 'GET',
  });
  dataForm.name = data.value?.name;
  dataForm.path = data.value?.path;
}

const handleAdd = () => {
  return useFetch('/api/menus/create', {
    method: 'POST',
    body: dataForm,
  });
};

const handleEdit = () => {
  return useFetch(`/api/menus/${id}`, {
    method: 'PUT',
    body: dataForm,
  });
};

const goBack = () => {
  const router = useRouter();
  router.back();
};

const onSubmit = async () => {
  if (id) {
    await handleEdit();
    goBack();
  } else {
    await handleAdd();
    goBack();
  }
};
</script>

<style lang="stylus" scoped>
.header
  margin 10px 0
</style>
