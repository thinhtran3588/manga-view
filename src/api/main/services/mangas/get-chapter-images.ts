import axios from 'axios';
import last from 'lodash/fp/last';
import {parse} from 'node-html-parser';
import {MangaService} from '@api/main/interfaces';
import {DEFAULT_BROWSER_HEADERS} from '@api/core/constants';

const getExtension = (url: string): string => {
  const fileName = last(url.split('/'))?.split('?')[0];
  if (fileName?.includes('.')) {
    return `.${last(fileName.split('.'))}`;
  }
  return '';
};

export const getChapterImages: MangaService['getChapterImages'] = async (manga, chapterId) => {
  try {
    const chapterUrl = manga.chapters?.find((c) => c.id === chapterId)?.originalUrl || '';
    const {data} = await axios(chapterUrl, {
      headers: DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);

    return htmlContent
      .querySelectorAll('.page-chapter img')
      .map((el) => {
        const chapterEl = el as unknown as HTMLLinkElement;
        return chapterEl.getAttribute('data-original') || '';
      })
      .filter((url) => url)
      .map(
        (url) =>
          `/api/proxy-image/img${getExtension(url)}?url=${encodeURIComponent(
            url.includes('http') ? url : `https:${url}`,
          )}`,
      );
  } catch (error) {
    return [];
  }
};
