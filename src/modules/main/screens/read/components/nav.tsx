import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState, useEffect, useCallback} from 'react';
import reverse from 'lodash/fp/reverse';
import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import {ListBox} from '@core/components/list-box';
import {LogoCompact} from '@core/components/logo-compact';
import {getI18nText} from '@core/helpers/get-i18n-text';
import READ_I18N_TEXT from '@locales/read.json';
import SITE_I18N_TEXT from '@locales/site.json';
import type {Chapter, Manga} from '@main/interfaces';

export interface HeaderProps {
  manga: Manga;
  currentChapter: Chapter;
  chapters: Chapter[];
  setLoading: (loading: boolean) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

export const Nav = (props: HeaderProps): JSX.Element => {
  const {chapters, manga, currentChapter, setLoading, currentImageIndex, setCurrentImageIndex} = props;
  const options = reverse(chapters || []).map((c) => ({value: c.id, text: c.name}));
  const router = useRouter();
  const [selectedValue, setValue] = useState(currentChapter.id);
  const isLastChapter = last(chapters)?.id === currentChapter.id;
  const isFirstChapter = first(chapters)?.id === currentChapter.id;

  const onChangeChapter = useCallback(
    (chapterId: string, showLastImage: boolean = false): void => {
      if (chapterId !== currentChapter.id) {
        setLoading(true);
        router.push({
          pathname: `/read/${manga.id}/${chapterId}`,
          query: showLastImage
            ? {
                showLastImage,
              }
            : undefined,
        });
      }
      setValue(chapterId);
    },
    [currentChapter.id, manga.id, router, setLoading],
  );

  const onViewDetail = (): void => {
    setLoading(true);
    router.push(`/manga/${manga.id}`);
  };

  const viewPrevChapter = useCallback((): void => {
    const currentChapterIndex = chapters.findIndex((c) => c.id === currentChapter.id);
    if (currentChapterIndex > 0) {
      onChangeChapter(chapters[currentChapterIndex - 1].id);
    }
  }, [chapters, currentChapter.id, onChangeChapter]);

  const viewNextChapter = useCallback((): void => {
    const currentChapterIndex = chapters.findIndex((c) => c.id === currentChapter.id);
    if (currentChapterIndex < chapters.length - 1) {
      onChangeChapter(chapters[currentChapterIndex + 1].id);
    }
  }, [chapters, currentChapter.id, onChangeChapter]);

  const viewPrevImage = useCallback((): void => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }, [currentImageIndex, setCurrentImageIndex]);

  const viewNextImage = useCallback((): void => {
    if (currentImageIndex < (currentChapter.imageUrls?.length || 0) - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      return;
    }

    viewNextChapter();
  }, [currentChapter.imageUrls, currentImageIndex, setCurrentImageIndex, viewNextChapter]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'ArrowUp':
          viewPrevImage();
          break;
        case 'ArrowDown':
          viewNextImage();
          break;
        case 'ArrowLeft':
          viewPrevChapter();
          break;
        case 'ArrowRight':
          viewNextChapter();
          break;
        default:
      }
    },
    [viewNextChapter, viewNextImage, viewPrevChapter, viewPrevImage],
  );

  useEffect(() => {
    setValue(currentChapter.id);

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [currentChapter.id, handleKeydown]);

  return (
    <header
      className='fixed bottom-0 lg:bottom-auto  inset-x-0 backdrop-filter backdrop-blur  
    firefox:bg-opacity-90 shadow-xl z-50'
    >
      <div className='container mx-auto'>
        <div className='flex items-center p-2 pr-0'>
          <Link href='/'>
            <a className='mr-2 hidden sm:block' title={getI18nText(SITE_I18N_TEXT, 'TAB_HOME', router)}>
              <LogoCompact className='h-10 w-10' />
            </a>
          </Link>
          <button
            type='button'
            onClick={onViewDetail}
            className={`mr-2 p-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`}
            title={getI18nText(READ_I18N_TEXT, 'VIEW_DETAIL', router)}
            disabled={isFirstChapter}
          >
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
                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={viewPrevChapter}
            className={`p-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`}
            title={getI18nText(READ_I18N_TEXT, 'PREVIOUS', router)}
            disabled={isFirstChapter}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
          </button>
          <ListBox
            selectedValue={selectedValue}
            setValue={onChangeChapter}
            options={options}
            containerClassName='flex-1 mx-2'
            buttonClassName='hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600'
            optionContainerClassNameOverride='left-0 right-0 max-h-72 overflow-auto
            bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 absolute bottom-14 lg:top-12 lg:bottom-auto'
            containerPositionClassName='static lg:relative'
          />
          <button
            type='button'
            onClick={viewNextChapter}
            className={`mr-2 p-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`}
            title={getI18nText(READ_I18N_TEXT, 'NEXT', router)}
            disabled={isLastChapter}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
            </svg>
          </button>
          <button
            type='button'
            onClick={viewPrevImage}
            className={`p-2 mr-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`}
            title={getI18nText(READ_I18N_TEXT, 'PREVIOUS_IMAGE', router)}
            disabled={currentImageIndex === 0}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
            </svg>
          </button>
          <button
            type='button'
            onClick={viewNextImage}
            className={`p-2 mr-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`}
            title={getI18nText(READ_I18N_TEXT, 'NEXT_IMAGE', router)}
            disabled={isLastChapter && currentImageIndex === (currentChapter.imageUrls?.length || 0) - 1}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
