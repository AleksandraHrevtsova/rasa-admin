export function parseApiError(err) {
  const status = err?.response?.status;
  const message = err?.response?.data?.message;
  const code = err?.response?.data?.code;

  return {
    status,
    message,
    code,
  };
};