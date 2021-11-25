import axios from 'axios';
import {parse} from 'node-html-parser';
import {MangaService} from '@api/main/interfaces';
import CONSTANTS from '@api/core/constants.json';
import {getProxyImageUrl} from '@api/core/helpers/get-proxy-image';

const CHAPTER_BASE_URL = 'https://ww.mangakakalot.tv/';

export const getChapterImages: MangaService['getChapterImages'] = async (manga, chapterId) => {
  try {
    const chapterUrl = manga.chapters?.find((c) => c.id === chapterId)?.originalUrl || '';
    const {data} = await axios(`${CHAPTER_BASE_URL}${chapterUrl}`, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);
    return (htmlContent.querySelector('.vung-doc')?.text.match(/data-src=".* class/g) || [])
      .map((tag) => tag.replace('data-src="', '').replace('"', '').replace(' class', ''))
      .filter((url) => url)
      .map((url) => getProxyImageUrl(url, manga.sourceId));
  } catch (error) {
    return [];
  }
};
