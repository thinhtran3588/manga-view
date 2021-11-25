import axios from 'axios';
import {parse} from 'node-html-parser';
import {Manga, MangaService} from '@api/main/interfaces';
import {handleError} from '@api/core/helpers/handle-error';
import {getProxyImageUrl} from '@api/core/helpers/get-proxy-image';
import CONSTANTS from '@api/core/constants.json';

const SEARCH_URL = 'https://ww.mangakakalot.tv/search';
const MANGA_BASE_URL = '/manga/';
const AUTHOR_TITLE = 'Author(s) :';
const LAST_UPDATED_TITLE = 'Updated :';

export const search: MangaService['search'] = async (query) => {
  const searchTerm = (query.searchTerm || '').trim();

  if (!searchTerm) {
    return {
      data: [],
      pagination: {
        nextPage: undefined,
      },
    };
  }

  try {
    let pageIndex = 1;
    if (query.nextPage) {
      const cursor = JSON.parse(Buffer.from(query.nextPage, 'base64').toString('ascii'));
      pageIndex = cursor.pageIndex;
    }

    const pageParam = pageIndex > 1 ? `&p=${pageIndex}` : '';
    const searchUrl = `${SEARCH_URL}/${encodeURIComponent(searchTerm)}${pageParam}`;
    const {data} = await axios(searchUrl, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);
    const mangas = htmlContent.querySelectorAll('.panel_story_list .story_item').map((item) => {
      const nameEl = item.querySelector('.story_name a') as unknown as HTMLAnchorElement;
      const id = nameEl?.getAttribute('href')?.replace(MANGA_BASE_URL, '');
      const name = nameEl?.text;

      const otherName = '';
      const status = '';
      let author = '';
      let lastUpdated = '';
      const genres: string[] = [];
      item.querySelectorAll('.story_item_right > span').forEach((metadataEl) => {
        if (metadataEl.textContent.includes(AUTHOR_TITLE)) {
          author = metadataEl.textContent.replace(AUTHOR_TITLE, '').trim();
        } else if (metadataEl.textContent.includes(LAST_UPDATED_TITLE)) {
          lastUpdated = metadataEl.textContent.replace(LAST_UPDATED_TITLE, '').trim();
        }
      });

      const descriptionEl = item.querySelector('.box_text') as unknown as HTMLDivElement;
      const description = descriptionEl?.textContent;

      const coverEl = item.querySelector('a img') as unknown as HTMLImageElement;
      const coverUrl = getProxyImageUrl(coverEl?.getAttribute('src') || '', CONSTANTS.SOURCES.MANGAKAKALOT.ID);

      return {
        sourceId: CONSTANTS.SOURCES.MANGAKAKALOT.ID,
        id,
        name,
        otherName,
        author,
        status,
        lastUpdated,
        description,
        coverUrl,
        genres,
      } as Manga;
    });

    let nextPage = '';
    const paginationPageEls = htmlContent.querySelectorAll('.group_page a');
    if (paginationPageEls.length > 0) {
      const lastPageIndexStr = paginationPageEls[paginationPageEls.length - 1].getAttribute('href')?.split('page=')[1];
      const lastPageIndex = lastPageIndexStr ? +lastPageIndexStr : 1;
      if (pageIndex < lastPageIndex) {
        nextPage = Buffer.from(JSON.stringify({pageIndex: pageIndex + 1})).toString('base64');
      }
    }

    return {
      data: mangas,
      pagination: {
        nextPage,
      },
    };
  } catch (error) {
    return {
      data: [],
      pagination: {},
      ...handleError(error),
    };
  }
};
