import type {Manga} from '@main/interfaces';
import {MangaCard} from './manga-card';

export interface MangaListProps {
  mangas: Manga[];
  title?: string;
}

export const MangaList = (props: MangaListProps): JSX.Element => {
  const {mangas, title} = props;
  return (
    <div>
      <h1 className='font-bold'>{title}</h1>
      <div className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1'>
        {mangas.map((manga) => (
          <MangaCard manga={manga} key={manga.id} mode='compact' />
        ))}
      </div>
    </div>
  );
};
