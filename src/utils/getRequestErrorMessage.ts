type RequestError = {
  data?: {
    statusMessage?: unknown;
  };
  statusMessage?: unknown;
};

export const getRequestErrorMessage = (error: unknown, fallback: string) => {
  if (!error || typeof error !== 'object') {
    return fallback;
  }

  const requestError = error as RequestError;
  const message = requestError.data?.statusMessage ?? requestError.statusMessage;

  return typeof message === 'string' && message ? message : fallback;
};
