import axios from 'axios';
import last from 'lodash/fp/last';
import reverse from 'lodash/fp/reverse';
import {parse} from 'node-html-parser';
import {Chapter, Manga, MangaService} from '@api/main/interfaces';

const MANGA_BASE_URL = 'http://www.nettruyenpro.com/truyen-tranh/';

export const getManga: MangaService['getManga'] = async (id: string) => {
  try {
    const searchUrl = `${MANGA_BASE_URL}/${id}`;
    const {data} = await axios(searchUrl, {
      headers: {
        'User-Agent':
          // eslint-disable-next-line max-len
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
      },
    });
    const htmlContent = parse(data);

    const nameEl = htmlContent.querySelector('.title-detail') as unknown as HTMLHeadElement;
    const name = nameEl?.textContent || '';

    const otherNameEl = htmlContent.querySelector('.othername .col-xs-8') as unknown as HTMLParagraphElement;
    const otherName = otherNameEl?.textContent || '';

    const authorEl = htmlContent.querySelector('.author .col-xs-8') as unknown as HTMLParagraphElement;
    const author = authorEl?.innerText || '';

    const statusEl = htmlContent.querySelector('.status .col-xs-8') as unknown as HTMLParagraphElement;
    const status = statusEl?.textContent;

    const genres: string[] = htmlContent.querySelectorAll('.kind a').map((el) => el.textContent || '');

    const lastUpdatedEl = htmlContent.querySelector('.small') as unknown as HTMLDivElement;
    let lastUpdated = lastUpdatedEl?.textContent || '';
    if (lastUpdated && lastUpdated.length > 2) {
      lastUpdated = lastUpdated
        .substring(1, lastUpdated.length - 1)
        .replace('Cập nhật lúc:', '')
        .trim();
    }

    const descriptionEl = htmlContent.querySelector('.detail-content p') as unknown as HTMLParagraphElement;
    const description = descriptionEl?.textContent;

    const coverEl = htmlContent.querySelector('.detail-info img') as unknown as HTMLImageElement;
    const coverUrl = coverEl?.getAttribute('src') || '';

    const chapters: Chapter[] = reverse(
      htmlContent
        .querySelectorAll('.list-chapter .row a')
        .map((el) => {
          const chapterEl = el as unknown as HTMLLinkElement;
          const chapterId = last(chapterEl.getAttribute('href')?.split('/'));
          return {
            id: chapterId,
            name: chapterEl.textContent,
            mangaId: id,
            url: chapterEl.getAttribute('href'),
          } as Chapter;
        })
        .filter((c) => c.id && c.name),
    );

    return {
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
