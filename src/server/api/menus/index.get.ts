export default defineEventHandler(async () => {
  try {
    return await Menus.find({});
  } catch (error) {
    throwMenuError(error);
  }
});
