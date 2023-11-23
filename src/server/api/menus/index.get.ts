export default defineEventHandler(async event => {
  try {
    return await Menus.find({});
  } catch (error) {
    return error;
  }
});
