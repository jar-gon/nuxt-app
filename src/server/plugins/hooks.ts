export default defineNitroPlugin(nitroApp => {
  if (import.meta.dev) {
    console.log('Nitro plugin', Reflect.get(nitroApp.hooks, '_hooks'));
  }
});
