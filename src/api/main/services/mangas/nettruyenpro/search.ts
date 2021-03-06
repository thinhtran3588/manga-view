import axios from 'axios';
import {parse} from 'node-html-parser';
import {Manga, MangaService} from '@api/main/interfaces';
import {handleError} from '@api/core/helpers/handle-error';
import {getProxyImageUrl} from '@api/core/helpers/get-proxy-image';
import CONSTANTS from '@api/core/constants.json';

const SEARCH_URL = 'https://www.nettruyenpro.com/tim-truyen';
const MANGA_BASE_URL = 'https://www.nettruyenpro.com/truyen-tranh/';
const OTHER_NAME_TITLE = 'Tên khác:';
const STATUS_TITLE = 'Tình trạng:';
const AUTHOR_TITLE = 'Tác giả:';
const LAST_UPDATED_TITLE = 'Ngày cập nhật:';
const GENRE_TITLE = 'Thể loại:';

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
    const searchUrl = `${SEARCH_URL}?keyword=${encodeURIComponent(searchTerm)}${pageParam}`;
    const {data} = await axios(searchUrl, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);
    const mangas = htmlContent.querySelectorAll('.items .item').map((item) => {
      const nameEl = item.querySelector('a.jtip') as unknown as HTMLAnchorElement;
      const id = nameEl?.getAttribute('href')?.replace(MANGA_BASE_URL, '');
      const name = nameEl?.text;

      let otherName = '';
      let status = '';
      let author = '';
      let lastUpdated = '';
      let genres: string[] = [];
      item.querySelectorAll('.message_main p').forEach((metadataEl) => {
        if (metadataEl.text.includes(OTHER_NAME_TITLE)) {
          otherName = metadataEl.text.replace(OTHER_NAME_TITLE, '').trim();
        } else if (metadataEl.text.includes(STATUS_TITLE)) {
          status = metadataEl.text.replace(STATUS_TITLE, '').trim();
        } else if (metadataEl.text.includes(AUTHOR_TITLE)) {
          author = metadataEl.text.replace(AUTHOR_TITLE, '').trim();
        } else if (metadataEl.text.includes(LAST_UPDATED_TITLE)) {
          lastUpdated = metadataEl.text.replace(LAST_UPDATED_TITLE, '').trim();
        } else if (metadataEl.text.includes(GENRE_TITLE)) {
          genres = metadataEl.text
            .replace(GENRE_TITLE, '')
            .trim()
            .split(',')
            .map((g) => g.trim());
        }
      });

      const descriptionEl = item.querySelector('.box_text') as unknown as HTMLDivElement;
      const description = descriptionEl?.textContent;

      const coverEl = item.querySelector('.image img') as unknown as HTMLImageElement;
      const coverUrl = getProxyImageUrl(
        coverEl?.getAttribute('data-original') || '',
        CONSTANTS.SOURCES.NETTRUYENPRO.ID,
      );

      return {
        sourceId: CONSTANTS.SOURCES.NETTRUYENPRO.ID,
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
