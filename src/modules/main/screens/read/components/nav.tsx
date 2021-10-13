import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import reverse from 'lodash/fp/reverse';
import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import {ListBox} from '@core/components/list-box';
import {LogoCompact} from '@core/components/logo-compact';
import {getI18nText} from '@core/helpers/get-i18n-text';
import READ_I18N_TEXT from '@locales/read.json';
import SITE_I18N_TEXT from '@locales/site.json';
import {Chapter} from '@main/interfaces';

export interface HeaderProps {
  mangaId: string;
  chapters: Chapter[];
  currentChapterId: string;
  setLoading: (loading: boolean) => void;
}

export const Nav = (props: HeaderProps): JSX.Element => {
  const {chapters, currentChapterId, mangaId, setLoading} = props;
  const options = reverse(chapters || []).map((c) => ({value: c.id, text: c.name}));
  const router = useRouter();
  const [selectedValue, setValue] = useState(currentChapterId);
  const isLastChapter = last(chapters)?.id === currentChapterId;
  const isFirstChapter = first(chapters)?.id === currentChapterId;

  useEffect(() => {
    setValue(currentChapterId);
  }, [currentChapterId]);

  const onChangeChapter = (chapterId: string): void => {
    if (chapterId !== currentChapterId) {
      setLoading(true);
      router.push(`/read/${mangaId}/${chapterId}`);
    }
    setValue(chapterId);
  };

  const onViewDetail = (): void => {
    setLoading(true);
    router.push(`/manga/${mangaId}`);
  };

  const viewPrevChapter = (): void => {
    const currentChapterIndex = chapters.findIndex((c) => c.id === currentChapterId);
    if (currentChapterIndex > 0) {
      onChangeChapter(chapters[currentChapterIndex - 1].id);
    }
  };

  const viewNextChapter = (): void => {
    const currentChapterIndex = chapters.findIndex((c) => c.id === currentChapterId);
    if (currentChapterIndex < chapters.length - 1) {
      onChangeChapter(chapters[currentChapterIndex + 1].id);
    }
  };

  return (
    <header
      className='fixed bottom-0 lg:bottom-auto lg:top-0 inset-x-0 backdrop-filter backdrop-blur  
    firefox:bg-opacity-90 shadow-xl z-50'
    >
      <div className='container mx-auto'>
        <div className='flex items-center'>
          <Link href='/'>
            <a className='block mx-4 my-2' title={getI18nText(SITE_I18N_TEXT, 'TAB_HOME', router)}>
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
            optionContainerClassName='top-14 sm:top-12'
            buttonClassName='hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600'
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
        </div>
      </div>
    </header>
  );
};
