import axios from 'axios';
import reverse from 'lodash/fp/reverse';
import {parse} from 'node-html-parser';
import {Chapter, Manga, MangaService} from '@api/main/interfaces';
import CONSTANTS from '@api/core/constants.json';
import {handleError} from '@api/core/helpers/handle-error';

const MANGA_BASE_URL = 'http://truyenqqtop.com/truyen-tranh';
const OTHER_NAME_TITLE = 'Tên Khác:';
const STATUS_TITLE = 'Tình trạng:';
const AUTHOR_TITLE = 'Tác giả:';

export const getManga: MangaService['getManga'] = async (id: string) => {
  try {
    const mangaUrl = `${MANGA_BASE_URL}/${id}`;
    const {data} = await axios(mangaUrl, {
      headers: CONSTANTS.DEFAULT_BROWSER_HEADERS,
    });
    const htmlContent = parse(data);

    const nameEl = htmlContent.querySelector('.story-detail h1') as unknown as HTMLHeadElement;
    const name = nameEl?.textContent || '';

    let otherName = '';
    let status = '';
    let author = '';
    htmlContent.querySelectorAll('.story-detail .txt .info-item').forEach((metadataEl) => {
      if (metadataEl.text.includes(STATUS_TITLE)) {
        status = metadataEl.text.replace(STATUS_TITLE, '').trim();
      } else if (metadataEl.text.includes(AUTHOR_TITLE)) {
        author = metadataEl.text.replace(AUTHOR_TITLE, '').trim();
      } else if (metadataEl.text.includes(OTHER_NAME_TITLE)) {
        otherName = metadataEl.text.replace(OTHER_NAME_TITLE, '').trim();
      }
    });

    const genres: string[] = htmlContent.querySelectorAll('.list01 a').map((el) => el.textContent || '');

    const descriptionEl = htmlContent.querySelector('.story-detail-info p') as unknown as HTMLParagraphElement;
    const description = descriptionEl?.textContent || '';

    const coverEl = htmlContent.querySelector('.story-detail img') as unknown as HTMLImageElement;
    const coverUrl = coverEl?.getAttribute('src') || '';

    const chapters: Chapter[] = reverse(
      htmlContent
        .querySelectorAll('.works-chapter-item a')
        .map((el) => {
          const chapterEl = el as unknown as HTMLLinkElement;
          const chapterOriginalId = chapterEl
            .getAttribute('href')
            ?.replace(`${MANGA_BASE_URL}/${id}-`, '')
            .replace('.html', '');
          return {
            id: chapterOriginalId,
            name: chapterEl.textContent,
            mangaId: id,
            originalUrl: chapterEl.getAttribute('href'),
          } as Chapter;
        })
        .filter((c) => c.id && c.name),
    );

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
      chapters,
    } as Manga;
  } catch (error) {
    handleError(error);
    return {
      sourceId: CONSTANTS.SOURCES.TRUYENQQTOP.ID,
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
