import type { Menu, MenuPayload } from '#shared/types/menu';

export const createMenu = (payload: MenuPayload) =>
  $fetch<Menu>('/api/menus', {
    method: 'POST',
    body: payload,
  });

export const updateMenu = (id: string, payload: MenuPayload) =>
  $fetch<Menu>(`/api/menus/${id}`, {
    method: 'PUT',
    body: payload,
  });

export const deleteMenu = (id: string) =>
  $fetch<Menu>(`/api/menus/${id}`, {
    method: 'DELETE',
  });
