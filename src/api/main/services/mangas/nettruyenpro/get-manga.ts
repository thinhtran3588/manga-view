import axios from 'axios';
import last from 'lodash/fp/last';
import reverse from 'lodash/fp/reverse';
import {parse} from 'node-html-parser';
import {Chapter, Manga, MangaService} from '@api/main/interfaces';
import {normalizeName} from '@api/core/helpers/normalize-name';
import {DEFAULT_BROWSER_HEADERS} from '@api/core/constants';

const MANGA_BASE_URL = 'http://www.nettruyenpro.com/truyen-tranh/';

export const getManga: MangaService['getManga'] = async (id: string) => {
  try {
    const mangaUrl = `${MANGA_BASE_URL}/${id}`;
    const {data} = await axios(mangaUrl, {
      headers: DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);

    const nameEl = htmlContent.querySelector('.title-detail') as unknown as HTMLHeadElement;
    const name = nameEl?.textContent || '';

    const otherNameEl = htmlContent.querySelector('.othername .col-xs-8') as unknown as HTMLParagraphElement;
    const otherName = otherNameEl?.textContent || '';

    const authorEl = htmlContent.querySelector('.author .col-xs-8') as unknown as HTMLParagraphElement;
    const author = authorEl?.innerText || '';

    const statusEl = htmlContent.querySelector('.status .col-xs-8') as unknown as HTMLParagraphElement;
    const status = statusEl?.textContent || '';

    const genres: string[] = htmlContent.querySelectorAll('.kind a').map((el) => el.textContent || '');

    const lastUpdatedEl = htmlContent.querySelector('.small') as unknown as HTMLDivElement;
    let lastUpdated = lastUpdatedEl?.textContent || '';
    if (lastUpdated && lastUpdated.length > 2) {
      lastUpdated = lastUpdated
        .substring(1, lastUpdated.length - 1)
        .replace('Cập nhật lúc:', '')
        .replace('[', '')
        .replace(']', '')
        .trim();
    }

    const descriptionEl = htmlContent.querySelector('.detail-content p') as unknown as HTMLParagraphElement;
    const description = descriptionEl?.textContent || '';

    const coverEl = htmlContent.querySelector('.detail-info img') as unknown as HTMLImageElement;
    const coverUrl = coverEl?.getAttribute('src') || '';

    const chapters: Chapter[] = reverse(
      htmlContent
        .querySelectorAll('.list-chapter .row a')
        .map((el) => {
          const chapterEl = el as unknown as HTMLLinkElement;
          const chapterName = chapterEl.textContent || '';
          const chapterNameNormalized = normalizeName(chapterName);
          const chapterOriginalId = last(chapterEl.getAttribute('href')?.split('/'));
          const chapterId = `${chapterNameNormalized}-${chapterOriginalId}`;
          return {
            id: chapterId,
            name: chapterEl.textContent,
            mangaId: id,
            originalUrl: chapterEl.getAttribute('href'),
          } as Chapter;
        })
        .filter((c) => c.id && c.name),
    );

    return {
      sourceId: '1',
      id,
      name,
      otherName,
      author,
      status,
      lastUpdated,
      description,
      coverUrl,
      genres,
      chapters,
    } as Manga;
  } catch (error) {
    return {
      sourceId: '1',
      id: '',
      author: '',
      coverUrl: '',
      description: '',
      lastUpdated: '',
      name: '',
      otherName: '',
      status: '',
      genres: [],
    } as Manga;
  }
};
