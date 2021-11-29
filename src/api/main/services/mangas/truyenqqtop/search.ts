import axios from 'axios';
import {parse} from 'node-html-parser';
import {Manga, MangaService} from '@api/main/interfaces';
import {handleError} from '@api/core/helpers/handle-error';
import {getProxyImageUrl} from '@api/core/helpers/get-proxy-image';
import CONSTANTS from '@api/core/constants.json';

const SEARCH_URL = 'http://truyenqqtop.com/tim-kiem.html';
const PAGING_SEARCH_URL = 'http://truyenqqtop.com/tim-kiem/trang-{0}.html';
const MANGA_BASE_URL = 'http://truyenqqtop.com/truyen-tranh/';
const OTHER_NAME_TITLE = 'Tên khác:';
const STATUS_TITLE = 'Tình trạng:';
const AUTHOR_TITLE = 'Tác giả:';

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

    const searchUrl = `${
      pageIndex > 1 ? PAGING_SEARCH_URL.replace('{0}', pageIndex.toString()) : SEARCH_URL
    }?q=${encodeURIComponent(searchTerm)}`;
    const {data} = await axios(searchUrl, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);
    const mangas = htmlContent.querySelectorAll('.list-stories .story-item').map((item) => {
      const nameEl = item.querySelector('.title-book a') as unknown as HTMLAnchorElement;
      const id = (nameEl?.getAttribute('href') || '').replace(MANGA_BASE_URL, '');
      const name = nameEl?.getAttribute('title');

      const otherNameEl = item.querySelector('.title-more-other') as unknown as HTMLDivElement;
      const otherName = otherNameEl?.textContent?.replace(OTHER_NAME_TITLE, '');

      let status = '';
      let author = '';
      item.querySelectorAll('.info').forEach((metadataEl) => {
        if (metadataEl.text.includes(STATUS_TITLE)) {
          status = metadataEl.text.replace(STATUS_TITLE, '').trim();
        } else if (metadataEl.text.includes(AUTHOR_TITLE)) {
          author = metadataEl.text.replace(AUTHOR_TITLE, '').trim();
        }
      });

      const genres: string[] = item.querySelectorAll('.list-tags a').map((e) => e.text);

      const descriptionEl = item.querySelector('.excerpt') as unknown as HTMLDivElement;
      const description = descriptionEl?.textContent;

      const coverEl = item.querySelector('.story-cover') as unknown as HTMLImageElement;
      const coverUrl = getProxyImageUrl(coverEl?.getAttribute('src') || '', CONSTANTS.SOURCES.TRUYENQQTOP.ID);

      return {
        sourceId: CONSTANTS.SOURCES.TRUYENQQTOP.ID,
        id,
        name,
        otherName,
        author,
        status,
        lastUpdated: '',
        description,
        coverUrl,
        genres,
      } as Manga;
    });

    let nextPage = '';
    const paginationPageEls = htmlContent.querySelectorAll('.pagination a');
    if (paginationPageEls.length > 0) {
      const lastPageHref = paginationPageEls[paginationPageEls.length - 1].getAttribute('href');
      if (lastPageHref && !lastPageHref.includes('javascript')) {
        const lastPageIndexStr = lastPageHref.split('trang-')[1].split('.html')[0];
        const lastPageIndex = lastPageIndexStr ? +lastPageIndexStr : 1;
        if (pageIndex < lastPageIndex) {
          nextPage = Buffer.from(JSON.stringify({pageIndex: pageIndex + 1})).toString('base64');
        }
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
