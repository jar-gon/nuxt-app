import { defineMongooseModel } from '#nuxt/mongoose';
import type { MenuPayload } from '#shared/types/menu';

export const Menus = defineMongooseModel<MenuPayload>('Menus', {
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
