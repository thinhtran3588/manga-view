import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import reverse from 'lodash/fp/reverse';
import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import {ListBox} from '@core/components/list-box';
import {LogoCompact} from '@core/components/logo-compact';
import {getI18nText} from '@core/helpers/get-i18n-text';
import READ_I18N_TEXT from '@locales/read.json';
import {Chapter} from '@main/interfaces';

export interface HeaderProps {
  mangaId: string;
  chapters: Chapter[];
  currentChapterId: string;
}

export const Header = (props: HeaderProps): JSX.Element => {
  const {chapters, currentChapterId, mangaId} = props;
  const options = reverse(chapters || []).map((c) => ({value: c.id, text: c.name}));
  const router = useRouter();
  const [selectedValue, setValue] = useState(currentChapterId);
  const isLastChapter = last(chapters)?.id === currentChapterId;
  const isFirstChapter = first(chapters)?.id === currentChapterId;

  const onChangeChapter = (chapterId: string): void => {
    if (chapterId !== currentChapterId) {
      router.push(`/read/${mangaId}/${chapterId}`);
    }
    setValue(chapterId);
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
      className='sticky top-0 backdrop-filter backdrop-blur  
    firefox:bg-opacity-90 shadow-xl z-50'
    >
      <div className='container mx-auto'>
        <div className='flex items-center'>
          <Link href='/'>
            <a className='block mx-4 my-2' title='Home'>
              <LogoCompact width={40} height={40} />
            </a>
          </Link>
          <button
            type='button'
            onClick={viewPrevChapter}
            className={`p-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80`}
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
          />
          <button
            type='button'
            onClick={viewNextChapter}
            className={`mr-2 p-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80`}
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
