import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import reverse from 'lodash/fp/reverse';
import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import {useDispatch, useSelector} from 'react-redux';
import BookOpenIcon from '@heroicons/react/outline/BookOpenIcon';
import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon';
import ChevronUpIcon from '@heroicons/react/outline/ChevronUpIcon';
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon';
import DotsVerticalIcon from '@heroicons/react/outline/DotsVerticalIcon';
import {ListBox} from '@core/components/list-box';
import {LogoCompact} from '@core/components/logo-compact';
import {getI18nText} from '@core/helpers/get-i18n-text';
import READ_I18N_TEXT from '@locales/read.json';
import SITE_I18N_TEXT from '@locales/site.json';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import CONSTANTS from '@core/constants.json';
import type {Chapter, Manga} from '@main/interfaces';
import {Dispatch, RootState} from '@store';
import {MenuItems} from './menu-items';

export interface HeaderProps {
  manga: Manga;
  currentChapter: Chapter;
  chapters: Chapter[];
  currentImageIndex: number;
  selectedChapterId: string;
  setLoading: (loading: boolean) => void;
  setCurrentImageIndex: (index: number) => void;
  onViewDetail: () => void;
  viewPrevChapter: () => void;
  viewNextChapter: () => void;
  viewPrevImage: () => void;
  viewNextImage: () => void;
  onChangeChapter: (chapterId: string) => void;
}

export const Nav = (props: HeaderProps): JSX.Element => {
  const {
    chapters,
    currentChapter,
    currentImageIndex,
    selectedChapterId,
    onViewDetail,
    viewPrevChapter,
    viewNextChapter,
    viewPrevImage,
    viewNextImage,
    onChangeChapter,
  } = props;
  const options = reverse(chapters || []).map((c) => ({value: c.id, text: c.name}));
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);
  const {
    viewMode: {changeViewMode},
  } = useDispatch<Dispatch>();
  const isLastChapter = last(chapters)?.id === currentChapter.id;
  const isFirstChapter = first(chapters)?.id === currentChapter.id;

  const toggleViewMode = (): void => {
    changeViewMode(
      viewMode === CONSTANTS.VIEW_MODE.ALL_IMAGES ? CONSTANTS.VIEW_MODE.ONE_IMAGE : CONSTANTS.VIEW_MODE.ALL_IMAGES,
    );
  };

  const toggleMenuVisible = (): void => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header
      className='fixed bottom-0 lg:bottom-auto inset-x-0 backdrop-filter backdrop-blur  
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
            className={`mr-2 p-2 rounded-full disabled:opacity-50 hidden sm:block
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`}
            title={getI18nText(READ_I18N_TEXT, 'VIEW_DETAIL', router)}
          >
            <BookOpenIcon className='h-6 w-6' />
          </button>
          <button
            type='button'
            onClick={toggleMenuVisible}
            className={`mr-2 p-2 rounded-full disabled:opacity-50 sm:hidden
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`}
            title={getI18nText(READ_I18N_TEXT, 'VIEW_DETAIL', router)}
          >
            <DotsVerticalIcon className='h-6 w-6' />
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
            <ChevronLeftIcon className='h-6 w-6' />
          </button>
          <ListBox
            selectedValue={selectedChapterId}
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
            <ChevronRightIcon className='h-6 w-6' />
          </button>
          <button
            type='button'
            onClick={toggleViewMode}
            className={`mr-2 p-2 rounded-full disabled:opacity-50 hidden sm:block
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-60`}
            title={getI18nText(
              SETTINGS_I18N_TEXT,
              viewMode === CONSTANTS.VIEW_MODE.ALL_IMAGES ? 'VIEW_MODE_ALL_IMAGES' : 'VIEW_MODE_ONE_IMAGE',
              router,
            )}
          >
            {viewMode === CONSTANTS.VIEW_MODE.ALL_IMAGES && (
              <svg className='h-6 w-6' viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg' fill='currentColor'>
                <rect x='28' y='93' width='200' height='69' />
                <rect x='28' y='40' width='200' height='32' />
                <rect x='28' y='183' width='200' height='32' />
              </svg>
            )}
            {viewMode === CONSTANTS.VIEW_MODE.ONE_IMAGE && (
              <svg className='h-6 w-6' viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg' fill='currentColor'>
                <rect x='28' y='28' width='200' height='199' />
              </svg>
            )}
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
            <ChevronUpIcon className='h-6 w-6' />
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
            <ChevronDownIcon className='h-6 w-6' />
          </button>
        </div>
      </div>
      <MenuItems visible={menuVisible} viewMode={viewMode} toggleViewMode={toggleViewMode} viewDetail={onViewDetail} />
    </header>
  );
};
