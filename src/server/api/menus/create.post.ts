export default defineEventHandler(async event => {
  const body = await readBody(event);
  try {
    return await Menus(body).save();
  } catch (error) {
    return error;
  }
});
