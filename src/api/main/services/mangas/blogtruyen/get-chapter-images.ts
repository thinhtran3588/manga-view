import axios from 'axios';
import {parse} from 'node-html-parser';
import {MangaService} from '@api/main/interfaces';
import CONSTANTS from '@api/core/constants.json';
import {getProxyImageUrl} from '@api/core/helpers/get-proxy-image';
import {handleError} from '@api/core/helpers/handle-error';

const BLACKLIST_URLS = ['https://blogtruyen.vn/donate.png'];
const CHAPTER_BASE_URL = 'https://blogtruyen.vn';

export const getChapterImages: MangaService['getChapterImages'] = async (manga, chapterId) => {
  try {
    const chapterUrl = manga.chapters?.find((c) => c.id === chapterId)?.originalUrl || '';
    const {data} = await axios(`${CHAPTER_BASE_URL}${chapterUrl}`, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);
    return htmlContent
      .querySelectorAll('#content img')
      .map((el) => {
        const chapterEl = el as unknown as HTMLLinkElement;
        return chapterEl.getAttribute('src') || '';
      })
      .filter((url) => url && !BLACKLIST_URLS.includes(url))
      .map((url) => getProxyImageUrl(url, manga.sourceId));
  } catch (error) {
    handleError(error);
    return [];
  }
};
