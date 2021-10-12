import type {Manga} from './manga';
import type {MangaSearchQuery} from './manga-search-query';
import type {CursorQueryResult} from './query-result';

export interface MangaService {
  search: (query: MangaSearchQuery) => Promise<CursorQueryResult<Manga>>;
  getManga: (id: string) => Promise<Manga>;
  getChapterImages: (manga: Manga, chapterId: string) => Promise<string[]>;
}
