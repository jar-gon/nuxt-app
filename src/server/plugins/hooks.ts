export default defineNitroPlugin(nitroApp => {
  console.log('Nitro plugin', nitroApp.hooks._hooks);
});
