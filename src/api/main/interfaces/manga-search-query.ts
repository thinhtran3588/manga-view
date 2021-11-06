import {CursorQuery} from './query';

export interface MangaSearchQuery extends CursorQuery {
  searchTerm?: string;
  sourceId?: string;
}
