const redirectArr = ['/contact']; // 二级路由页面，进入首页重定向数组

export default defineNuxtRouteMiddleware((to, from) => {
  // 在实际应用中，你可能不会将每个路由重定向到 `/`
  // 但是在重定向之前检查 `to.path` 是很重要的，否则可能会导致无限重定向循环
  if (redirectArr.includes(to.path)) {
    return navigateTo(`${to.path}/home`);
  }
});
