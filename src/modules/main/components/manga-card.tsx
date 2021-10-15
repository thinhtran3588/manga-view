/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import {useRouter} from 'next/router';
import last from 'lodash/fp/last';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import type {Manga} from '@main/interfaces';
import MAIN_I18N_TEXT from '@locales/main.json';
import {Card} from '@core/components/card';
import {Button} from '@core/components/button';
import {getI18nText} from '@core/helpers/get-i18n-text';
import type {RootState} from '@store';

export interface MangaCardProps {
  className?: string;
  manga: Manga;
  mode?: 'compact' | 'full';
}

export const MangaCard = (props: MangaCardProps): JSX.Element => {
  const {manga, className, mode = 'compact'} = props;
  const [detailLoading, setDetailLoading] = useState(false);
  const [readLastLoading, setReadLastLoading] = useState(false);
  const [readFirstLoading, setReadFirstLoading] = useState(false);
  const [readCurrentLoading, setReadCurrentLoading] = useState(false);
  const currentChapterId = useSelector((state: RootState) => state.recentMangas.currentChapters[manga.id]);
  const router = useRouter();

  const viewDetail = (): void => {
    setDetailLoading(true);
    router.push(`/manga/${manga.id}`);
  };

  const readFirstChapter = (): void => {
    if (manga.chapters && manga.chapters.length > 0) {
      setReadFirstLoading(true);
      const firstChapter = manga.chapters[0];
      router.push(`/read/${manga.id}/${firstChapter.id}`);
    }
  };

  const readLastChapter = (): void => {
    if (manga.chapters && manga.chapters.length > 0) {
      setReadLastLoading(true);
      const lastChapter = last(manga.chapters);
      router.push(`/read/${manga.id}/${lastChapter?.id}`);
    } else {
      setReadLastLoading(true);
      router.push(`/read/${manga.id}/0`);
    }
  };

  const readCurrentChapter = (): void => {
    if (currentChapterId) {
      setReadCurrentLoading(true);
      router.push(`/read/${manga.id}/${currentChapterId}`);
    }
  };

  return (
    <Card
      className={clsx('p-1 hover:cursor-pointer', className)}
      title={manga.name}
      contentClassName='flex flex-row flex-wrap mt-2'
      headerClassName='text-primary dark:text-primary-light'
    >
      <div className='w-1/3'>
        <img src={manga.coverUrl} width='100%' alt={manga.name} />
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
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </span>
          <span>{manga.author}</span>
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
        {!currentChapterId && (
          <Button className='flex-1 mx-1 mb-2' onClick={readLastChapter} loading={readLastLoading}>
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_READ', router)}
          </Button>
        )}
        {currentChapterId && (
          <Button className='flex-1 mx-1 mb-2' onClick={readCurrentChapter} loading={readCurrentLoading}>
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_CONTINUE_READING', router)}
          </Button>
        )}
        {mode === 'compact' && (
          <Button
            className='flex-1 mx-1 mb-2'
            onClick={viewDetail}
            color='primary'
            variant='outline'
            loading={detailLoading}
          >
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_DETAIL', router)}
          </Button>
        )}
        {mode === 'full' && (
          <>
            <Button
              className='flex-1 mx-1 mb-2 overflow-hidden'
              onClick={readFirstChapter}
              color='info'
              variant='outline'
              loading={readFirstLoading}
            >
              {getI18nText(MAIN_I18N_TEXT, 'MANGA_READ_FROM_BEGINNING', router)}
            </Button>
          </>
        )}
      </div>
      <p className={clsx('whitespace-pre-line', mode === 'compact' ? 'h-36 overflow-hidden' : '')}>
        {manga.description}
      </p>
    </Card>
  );
};
