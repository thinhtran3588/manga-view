/* eslint-disable max-len */
import axios from 'axios';
import type {Manga} from '@main/interfaces';
import type {CursorQueryResult} from '@core/interfaces';

export const searchManga = async (
  searchTerm: string,
  nextPage?: string,
  sourceId: string = '1',
): Promise<CursorQueryResult<Manga>> => {
  const nextPageParam = nextPage ? `&nextPage=${nextPage}` : '';
  const result = await axios(
    `/api/mangas?searchTerm=${encodeURIComponent(searchTerm)}&sourceId=${sourceId}${nextPageParam}`,
  );
  return result.data;
};
