import last from 'lodash/fp/last';

const getExtension = (url: string): string => {
  const fileName = last(url.split('/'))?.split('?')[0];
  if (fileName?.includes('.')) {
    return `.${last(fileName.split('.'))}`;
  }
  return '';
};

const addHttpsUrl = (url: string): string => (url.includes('http') ? url : `https:${url}`);

export const getProxyImageUrl = (url: string): string =>
  `/api/proxy-image/img${getExtension(url)}?url=${encodeURIComponent(addHttpsUrl(url))}`;
