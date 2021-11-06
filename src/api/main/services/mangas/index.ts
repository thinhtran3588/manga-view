import {MangaService} from '@api/main/interfaces';
import {nettruyenproService} from './nettruyenpro';

export const mangaServices: {[sourceId: string]: MangaService} = {
  undefined: nettruyenproService,
  '1': nettruyenproService,
};
