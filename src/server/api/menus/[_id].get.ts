export default defineEventHandler(async event => {
  // const query = getQuery(event);
  try {
    return await Menus.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
