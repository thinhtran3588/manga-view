/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';
import last from 'lodash/fp/last';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {Manga} from '@main/interfaces';
import MAIN_I18N_TEXT from '@locales/main.json';
import {Card} from '@core/components/card';
import {Button} from '@core/components/button';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {Dispatch, RootState} from '@store';

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
  const isFavorite = useSelector((state: RootState) => state.favoriteMangas.ids.includes(manga.id));
  const [visible, setVisible] = useState(false);
  const {
    favoriteMangas: {toggleFavoriteManga},
  } = useDispatch<Dispatch>();
  const router = useRouter();

  const viewDetail = (): void => {
    setDetailLoading(true);
    router.push(`/manga/${manga.id}`);
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

  const readFirstChapter = (): void => {
    if (manga.chapters && manga.chapters.length > 0) {
      setReadFirstLoading(true);
      const firstChapter = manga.chapters[0];
      router.push(`/read/${manga.id}/${firstChapter?.id}`);
    }
  };

  const readCurrentChapter = (): void => {
    if (currentChapterId) {
      setReadCurrentLoading(true);
      router.push(`/read/${manga.id}/${currentChapterId}`);
    }
  };

  const toggleFavorite = (): void => {
    toggleFavoriteManga(manga);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <Card
      className={clsx(
        'p-1 hover:cursor-pointer transition-opacity duration-1000',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      CustomHeader={
        <div className='font-semibold pb-2 flex justify-center items-center '>
          <Link href={`/manga/${manga.id}`}>
            <a className='block flex-1 text-primary dark:text-primary-light sm:truncate'>{manga.name}</a>
          </Link>
          <button
            type='button'
            onClick={toggleFavorite}
            className={clsx(
              'ml-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 ',
              isFavorite ? 'text-error dark:text-error-light' : '',
            )}
            title={getI18nText(MAIN_I18N_TEXT, isFavorite ? 'MANGA_REMOVE_FAVORITE' : 'MANGA_ADD_FAVORITE', router)}
          >
            {isFavorite ? (
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  // eslint-disable-next-line max-len
                  d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
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
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
            )}
          </button>
        </div>
      }
      contentClassName='flex flex-row flex-wrap mt-2'
      headerClassName='text-primary dark:text-primary-light'
    >
      <div className='w-1/3'>
        <img
          src={manga.coverUrl}
          width='100%'
          alt={manga.name}
          className='min-h-0 sm:min-h-10 object-contain object-top'
        />
      </div>
      <div className='w-2/3 pl-2'>
        <div className='flex mb-2' title={getI18nText(MAIN_I18N_TEXT, 'MANGA_STATUS', router)}>
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
          {mode === 'full' && (
            <span className='hidden md:block font-semibold text-secondary dark:text-secondary-light'>
              {getI18nText(MAIN_I18N_TEXT, 'MANGA_STATUS', router)}:&nbsp;
            </span>
          )}
          <span>{manga.status}</span>
        </div>
        <div className='flex mb-2' title={getI18nText(MAIN_I18N_TEXT, 'MANGA_AUTHOR', router)}>
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
          {mode === 'full' && (
            <span className='hidden md:block font-semibold text-success dark:text-success-light'>
              {getI18nText(MAIN_I18N_TEXT, 'MANGA_AUTHOR', router)}:&nbsp;
            </span>
          )}
          <span>{manga.author}</span>
        </div>
        <div className='flex' title={getI18nText(MAIN_I18N_TEXT, 'MANGA_LAST_UPDATED', router)}>
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
          {mode === 'full' && (
            <span className='hidden md:block font-semibold text-info dark:text-info-light'>
              {getI18nText(MAIN_I18N_TEXT, 'MANGA_LAST_UPDATED', router)}:&nbsp;
            </span>
          )}
          <span>{manga.lastUpdated}</span>
        </div>
      </div>
      <div className={clsx('flex w-full mt-2 flex-col')}>
        {!currentChapterId && (
          <Button className='flex-1 mb-2' onClick={readLastChapter} loading={readLastLoading}>
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_READ', router)}
          </Button>
        )}
        {currentChapterId && (
          <Button className='flex-1 mb-2' onClick={readCurrentChapter} loading={readCurrentLoading}>
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_CONTINUE_READING', router)}
          </Button>
        )}
        {mode === 'compact' && (
          <Button
            className='flex-1 mb-2'
            onClick={viewDetail}
            color='primary'
            variant='outline'
            loading={detailLoading}
          >
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_DETAIL', router)}
          </Button>
        )}
        {mode === 'full' && (
          <Button
            className='flex-1 mb-2'
            onClick={readFirstChapter}
            color='primary'
            variant='outline'
            loading={readFirstLoading}
          >
            {getI18nText(MAIN_I18N_TEXT, 'MANGA_READ_FROM_BEGINNING', router)}
          </Button>
        )}
      </div>
      <div className='flex flex-wrap'>
        {manga.genres.map((genre) => (
          <span key={genre} className='m-1 rounded-full p-0 px-2 bg-warning text-white'>
            {genre}
          </span>
        ))}
      </div>
      <p className={clsx('w-full text-justify flex-grow', mode === 'compact' ? 'max-h-60 overflow-hidden' : '')}>
        {manga.description}
      </p>
    </Card>
  );
};
