import type { BusinessApi } from '~/composables/useBusinessApi';

type PermissionResponse = Record<string, unknown>;

export const hasPermission = (api: BusinessApi) => api.get<PermissionResponse>('/api/zmbiz-csc-frontend-sale/apply/cancelLessonDictReason');
