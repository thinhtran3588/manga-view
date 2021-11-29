// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any): {errorCode?: string; errorMessage?: string} => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(error.stack);
  }
  return {
    errorCode: '',
    errorMessage: 'Something wrong happened.',
  };
};
