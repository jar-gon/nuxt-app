import { defineMongooseModel } from '#nuxt/mongoose';

export const Menus = defineMongooseModel('Menus', {
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
