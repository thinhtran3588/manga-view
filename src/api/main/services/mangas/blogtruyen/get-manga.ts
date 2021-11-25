import axios from 'axios';
import reverse from 'lodash/fp/reverse';
import {parse} from 'node-html-parser';
import {Chapter, Manga, MangaService} from '@api/main/interfaces';
import CONSTANTS from '@api/core/constants.json';

const MANGA_BASE_URL = 'https://blogtruyen.vn//';
const OTHER_NAME_TITLE = 'Tên khác:';
const STATUS_TITLE = 'Trạng thái:';
const AUTHOR_TITLE = 'Tác giả:';
const LAST_UPDATED_TITLE = 'Update:';

export const getManga: MangaService['getManga'] = async (id: string) => {
  try {
    const mangaId = id.split('-')[0];
    const mangaUrl = `${MANGA_BASE_URL}/${mangaId}`;
    const {data} = await axios(mangaUrl, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);

    const nameEl = htmlContent.querySelector('.entry-title a') as unknown as HTMLLinkElement;
    const name = nameEl?.textContent || '';
    const genres: string[] = htmlContent.querySelectorAll('.description .category a').map((el) => el.textContent || '');

    let otherName = '';
    let author = '';
    let lastUpdated = '';
    let status = '';
    htmlContent.querySelectorAll('.description p, .description div').forEach((metadataEl) => {
      if (metadataEl.text.includes(OTHER_NAME_TITLE)) {
        otherName = metadataEl.text.replace(OTHER_NAME_TITLE, '').trim();
      } else if (metadataEl.text.includes(STATUS_TITLE)) {
        status = metadataEl.text.split(STATUS_TITLE)[1].trim();
      } else if (metadataEl.text.includes(AUTHOR_TITLE)) {
        author = metadataEl.text.replace(AUTHOR_TITLE, '').trim();
      } else if (metadataEl.text.includes(LAST_UPDATED_TITLE)) {
        lastUpdated = metadataEl.text.replace(LAST_UPDATED_TITLE, '').trim();
      }
    });

    const descriptionEl = htmlContent.querySelector('.detail .content') as unknown as HTMLDivElement;
    const description = descriptionEl?.textContent || '';

    const coverEl = htmlContent.querySelector('.thumbnail img') as unknown as HTMLImageElement;
    const coverUrl = coverEl?.getAttribute('src') || '';

    const chapters: Chapter[] = reverse(
      htmlContent
        .querySelectorAll('.list-chapters .list-wrap p')
        .map((el) => {
          const chapterNameEl = el.querySelector('a') as unknown as HTMLLinkElement;
          const chapterName = chapterNameEl.textContent || '';
          const chapterId = chapterNameEl
            .getAttribute('href')
            ?.split('/')
            .filter((w) => w)
            .join('-');
          return {
            id: chapterId || '',
            name: chapterName || '',
            mangaId: id,
            originalUrl: chapterNameEl.getAttribute('href') || '',
          } as Chapter;
        })
        .filter((c) => c.id && c.name),
    );

    return {
      sourceId: CONSTANTS.SOURCES.BLOGTRUYEN.ID,
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
      sourceId: CONSTANTS.SOURCES.BLOGTRUYEN.ID,
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
