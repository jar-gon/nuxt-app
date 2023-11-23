const request = async (url: string, options: {}) => {
  const headers = useRequestHeaders(['Cookie']);
  const { apiBase: baseURL } = useRuntimeConfig().public;
  return await useFetch(url, {
    baseURL,
    headers,
    credentials: 'include',
    ...options,
    onRequest({ options }) {
      options.headers = options.headers || {};
    },
    onRequestError({ request, error }) {
      console.info(`${request} error：${error}`);
    },
    onResponse({ response }) {
      const { code } = response._data;
      if (code === '11') {
        console.info('全局处理未登录信息');
      }
      return response._data;
    },
    onResponseError({ request }) {
      console.info('onResponseError：', request);
    },
  });
};

export const myUseFetch = {
  get: (url: string, params?: {}, options?: {}) => {
    return request(url, { method: 'GET', server: false, params, ...options });
  },
  post: (url: string, params?: {}, options?: {}) => {
    return request(url, { method: 'POST', server: false, body: params, ...options });
  },
};
