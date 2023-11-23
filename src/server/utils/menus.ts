import type { MenuPayload } from '#shared/types/menu';
import { createError, type H3Event } from 'h3';

export const getMenuId = (event: H3Event) => {
  const id = event.context.params?._id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Menu id is required' });
  }

  return id;
};

export const getMenuPayload = (body: unknown): MenuPayload => {
  const payload = body as Partial<Record<keyof MenuPayload, unknown>>;
  const name = typeof payload?.name === 'string' ? payload.name.trim() : '';
  const path = typeof payload?.path === 'string' ? payload.path.trim() : '';

  if (!name || !path) {
    throw createError({ statusCode: 400, statusMessage: 'Menu name and path are required' });
  }

  return { name, path };
};

export const throwMenuError = (error: unknown): never => {
  if (error && typeof error === 'object' && 'statusCode' in error) {
    throw error;
  }

  if (error && typeof error === 'object' && 'name' in error && error.name === 'CastError') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid menu id' });
  }

  throw createError({ statusCode: 500, statusMessage: 'Menu request failed' });
};
