import {MangaService} from '@api/main/interfaces';
import {blogtruyenService} from './blogtruyen';
import {nettruyenproService} from './nettruyenpro';

export const mangaServices: {[sourceId: string]: MangaService} = {
  undefined: nettruyenproService,
  '1': nettruyenproService,
  '2': blogtruyenService,
};
