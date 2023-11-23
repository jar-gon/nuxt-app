type BusinessResponse = {
  code?: string;
};

export const useBusinessApi = () => {
  const { apiBase: baseURL } = useRuntimeConfig().public;
  const api = $fetch.create({
    baseURL,
    credentials: 'include',
    onRequestError({ request, error }) {
      console.info(`${request} error：${error}`);
    },
    onResponse({ response }) {
      const data = response._data as BusinessResponse | undefined;

      if (data?.code === '11') {
        console.info('全局处理未登录信息');
      }
    },
    onResponseError({ request }) {
      console.info('onResponseError：', request);
    },
  });

  return {
    get<T>(url: string, params?: Record<string, unknown>) {
      return api<T>(url, { method: 'GET', query: params });
    },
    post<T>(url: string, body?: Record<string, unknown>) {
      return api<T>(url, { method: 'POST', body });
    },
  };
};

export type BusinessApi = ReturnType<typeof useBusinessApi>;
