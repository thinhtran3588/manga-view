import {MangaService} from '@api/main/interfaces';
import {getChapterImages} from './get-chapter-images';
import {getManga} from './get-manga';
import {search} from './search';

export const blogtruyenService: MangaService = {
  search,
  getManga,
  getChapterImages,
};
