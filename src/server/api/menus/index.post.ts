export default defineEventHandler(async event => {
  const body = await readBody(event);

  try {
    return await new Menus(getMenuPayload(body)).save();
  } catch (error) {
    throwMenuError(error);
  }
});
