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
      <div className='flex flex-row flex-wrap'>
        {mangas.map((manga) => (
          <div key={manga.id} className='p-1 w-full sm:w-1/2 xl:w-1/3'>
            <MangaCard manga={manga} />
          </div>
        ))}
      </div>
    </div>
  );
};
