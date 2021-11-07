import axios from 'axios';
import {parse} from 'node-html-parser';
import trim from 'lodash/fp/trim';
import {Manga, MangaService} from '@api/main/interfaces';
import {handleError} from '@api/core/helpers/handle-error';
import {getProxyImageUrl} from '@api/core/helpers/get-proxy-image';
import CONSTANTS from '@api/core/constants.json';

const SEARCH_URL = 'https://blogtruyen.vn/timkiem/nangcao/1/0/-1/-1';

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
    const searchUrl = `${SEARCH_URL}?txt=${encodeURIComponent(searchTerm)}${pageParam}`;
    const {data} = await axios(searchUrl, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);
    const mangas = htmlContent
      .querySelectorAll('.list-manga-bycate .list > p')
      .filter((item, index) => index > 0)
      .map((item) => {
        const nameEl = item.querySelector('a') as unknown as HTMLAnchorElement;
        const href = nameEl?.getAttribute('href') || '';
        const id = href
          .split('/')
          .filter((w) => w)
          .join('-');
        const name = trim(nameEl?.text);

        const otherName = '';
        const status = '';
        const author = '';
        const lastUpdated = '';
        const genres: string[] = [];

        const descriptionEl = item.nextElementSibling?.querySelector('.al-j') as unknown as HTMLDivElement;
        const description = descriptionEl?.textContent;

        const coverEl = item.nextElementSibling?.querySelector('img') as unknown as HTMLImageElement;
        const coverUrl = getProxyImageUrl(coverEl?.getAttribute('src') || '', '2');

        return {
          sourceId: '2',
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
    const paginationPageEls = htmlContent.querySelectorAll('.pagination a');
    if (paginationPageEls.length > 0) {
      const lastPageIndexStr = paginationPageEls[paginationPageEls.length - 1].getAttribute('href')?.split('p=')[1];
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
