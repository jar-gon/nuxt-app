export default defineEventHandler(event => {
  if (import.meta.dev) {
    console.log('New request: ' + getRequestURL(event));
  }
});
