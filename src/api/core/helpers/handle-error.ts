export const handleError = (_error: unknown): {errorCode?: string; errorMessage?: string} => ({
  errorCode: '',
  errorMessage: 'Something wrong happened.',
});
