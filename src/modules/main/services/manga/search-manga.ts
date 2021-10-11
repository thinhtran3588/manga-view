/* eslint-disable max-len */
import axios from 'axios';
import type {Manga} from '@main/interfaces';
import type {CursorQueryResult} from '@core/interfaces';

export const searchManga = async (searchTerm: string, nextPage?: string): Promise<CursorQueryResult<Manga>> => {
  const result = await axios(
    `/api/mangas?searchTerm=${encodeURIComponent(searchTerm)}}${nextPage ? `&nextPage=${nextPage}` : ''}`,
  );
  return result.data;
};
