import type { Menu } from '#shared/types/menu';

export const useMenus = () =>
  useFetch<Menu[]>('/api/menus', {
    key: 'menus',
    default: () => [],
  });
