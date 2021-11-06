import axios from 'axios';
import {parse} from 'node-html-parser';
import {MangaService} from '@api/main/interfaces';
import {DEFAULT_BROWSER_HEADERS} from '@api/core/constants';
import {getProxyImageUrl} from '@api/core/helpers/get-proxy-image';

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
      .map(getProxyImageUrl);
  } catch (error) {
    return [];
  }
};
