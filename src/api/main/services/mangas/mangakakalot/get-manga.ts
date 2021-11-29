import axios from 'axios';
import last from 'lodash/fp/last';
import reverse from 'lodash/fp/reverse';
import {parse} from 'node-html-parser';
import {Chapter, Manga, MangaService} from '@api/main/interfaces';
import {normalizeName} from '@api/core/helpers/normalize-name';
import CONSTANTS from '@api/core/constants.json';
import {handleError} from '@api/core/helpers/handle-error';

const MANGA_BASE_URL = 'https://ww.mangakakalot.tv/manga/';
const SITE_BASE_URL = 'https://ww.mangakakalot.tv';
const STATUS_TITLE = 'Status :';
const AUTHOR_TITLE = 'Author(s) :';
const LAST_UPDATED_TITLE = 'Last updated :';
const GENRE_TITLE = 'Genres :';

export const getManga: MangaService['getManga'] = async (id: string) => {
  try {
    const mangaUrl = `${MANGA_BASE_URL}/${id}`;
    const {data} = await axios(mangaUrl, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);

    const nameEl = htmlContent.querySelector('.manga-info-text li h1') as unknown as HTMLHeadElement;
    const name = nameEl?.textContent || '';

    const otherNameEl = htmlContent.querySelector('.manga-info-text li h2') as unknown as HTMLParagraphElement;
    const otherName = otherNameEl?.textContent || '';

    let status = '';
    let author = '';
    let lastUpdated = '';
    let genres: string[] = [];
    htmlContent.querySelectorAll('.manga-info-text li').forEach((metadataEl) => {
      if (metadataEl.text.includes(STATUS_TITLE)) {
        status = metadataEl.text.replace(STATUS_TITLE, '').trim();
      } else if (metadataEl.text.includes(AUTHOR_TITLE)) {
        author = metadataEl.text
          .replace(AUTHOR_TITLE, '')
          .trim()
          .split(',')
          .filter((a) => a)
          .join(',');
      } else if (metadataEl.text.includes(LAST_UPDATED_TITLE)) {
        lastUpdated = metadataEl.text.replace(LAST_UPDATED_TITLE, '').trim();
      } else if (metadataEl.text.includes(GENRE_TITLE)) {
        genres = (metadataEl.text.match(/>.*,/g) || []).map((tag) => tag.replace('>', '').replace(',', ''));
      }
    });

    const descriptionEl = htmlContent.querySelector('.manga-info-top').nextElementSibling
      .nextSibling as unknown as HTMLDivElement;
    const description = descriptionEl?.textContent || '';

    const coverEl = htmlContent.querySelector('.manga-info-pic') as unknown as HTMLImageElement;
    const coverUrl = `${SITE_BASE_URL}/${(coverEl.textContent?.match(/src=".*"/) || [''])[0]
      .replace('src="', '')
      .replace('"', '')}`;

    const chapters: Chapter[] = reverse(
      htmlContent
        .querySelectorAll('.chapter-list .row')
        .map((el) => {
          const text = el.textContent || '';
          const originalUrl = (text.match(/href=".*"/) || [''])[0].replace('href="', '').replace('"', '');
          const chapterName = (text.match(/title=".*"/) || [''])[0]
            .replace('title="', '')
            .replace('"', '')
            .replace(`${name} -`, '')
            .trim();
          const chapterNameNormalized = normalizeName(chapterName);
          const chapterOriginalId = last(originalUrl.split('/'));
          const chapterId = `${chapterNameNormalized}-${chapterOriginalId}`;
          return {
            id: chapterId || '',
            name: chapterName,
            mangaId: id || '',
            originalUrl,
          } as Chapter;
        })
        .filter((c) => c.id && c.name),
    );

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
      chapters,
    } as Manga;
  } catch (error) {
    handleError(error);
    return {
      sourceId: CONSTANTS.SOURCES.MANGAKAKALOT.ID,
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
