import Image from 'next/image';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import MAIN_I18N_TEXT from '@locales/main.json';
import {Card} from '@core/components/card';
import type {Manga} from '@main/interfaces';
import {Button} from '@core/components/button';
import {getI18nText} from '@core/helpers/get-i18n-text';

export interface MangaCardProps {
  className?: string;
  manga: Manga;
  mode?: 'compact' | 'full';
}

export const MangaCard = (props: MangaCardProps): JSX.Element => {
  const {manga, className, mode = 'compact'} = props;
  const router = useRouter();

  const viewDetail = (): void => {
    router.push(`/manga/${manga.id}`, `/manga/${manga.id}`);
  };

  const readManga = (): void => {
    router.push(`/read/${manga.id}/0`, `/read/${manga.id}/0`);
  };

  return (
    <Card
      className={clsx('p-1 hover:cursor-pointer', className)}
      title={manga.name}
      contentClassName='flex flex-row flex-wrap mt-2'
      headerClassName='text-primary dark:text-primary-light'
    >
      <div className='w-1/3 h-32 relative'>
        <Image src='/sample-image.jpeg' layout='fill' objectFit='contain' objectPosition='center top' />
      </div>
      <div className='w-2/3 pl-2'>
        <div className='flex'>
          <span className='mr-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </span>
          <span>{manga.status}</span>
        </div>
        <div className='flex'>
          <span className='mr-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </span>
          <span>{manga.lastUpdated}</span>
        </div>
        <div className='flex mt-1'>
          <span className='mr-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                // eslint-disable-next-line max-len
                d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
              />
            </svg>
          </span>
          <span className='flex flex-1 flex-wrap'>
            {manga.genres.map((genre) => (
              <span key={genre} className='mr-2 mb-2 rounded-full p-0 px-2 bg-warning text-white'>
                {genre}
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={clsx('flex w-full mt-2', mode === 'compact' ? '' : 'flex-col md:flex-row')}>
        <Button className='flex-1 mx-1 mb-2' onClick={readManga}>
          {getI18nText(MAIN_I18N_TEXT, 'MANGA_READ', router)}
        </Button>
        {mode === 'compact' && (
          <Button className='flex-1 mx-1 mb-2' onClick={viewDetail} color='primary' variant='outline'>
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_DETAIL', router)}
          </Button>
        )}
        {mode === 'full' && (
          <>
            <Button className='flex-1 mx-1 mb-2 overflow-hidden' onClick={readManga} color='info' variant='outline'>
              {getI18nText(MAIN_I18N_TEXT, 'MANGA_READ_FROM_BEGINNING', router)}
            </Button>
          </>
        )}
      </div>
      <p className={clsx('', mode === 'compact' ? 'h-36 overflow-hidden' : '')}>{manga.description}</p>
    </Card>
  );
};
