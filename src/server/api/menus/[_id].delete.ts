export default defineEventHandler(async event => {
  try {
    const menu = await Menus.findOneAndDelete({ _id: getMenuId(event) });

    if (!menu) {
      throw createError({ statusCode: 404, statusMessage: 'Menu not found' });
    }

    return menu;
  } catch (error) {
    throwMenuError(error);
  }
});
