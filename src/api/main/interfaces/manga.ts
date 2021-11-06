import {Chapter} from './chapter';

export interface Manga {
  sourceId: string;
  id: string;
  name: string;
  otherName?: string;
  author: string;
  status: string;
  lastUpdated: string;
  description: string;
  genres: string[];
  coverUrl: string;
  chapters?: Chapter[];
}
