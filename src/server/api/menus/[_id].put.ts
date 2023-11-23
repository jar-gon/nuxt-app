export default defineEventHandler(async event => {
  const body = await readBody(event);
  try {
    const menu = await Menus.findOneAndUpdate({ _id: getMenuId(event) }, getMenuPayload(body), { returnDocument: 'after' });

    if (!menu) {
      throw createError({ statusCode: 404, statusMessage: 'Menu not found' });
    }

    return menu;
  } catch (error) {
    throwMenuError(error);
  }
});
