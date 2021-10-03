import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {ListBox} from '@core/components/list-box';
import {LogoCompact} from '@core/components/logo-compact';
import {getI18nText} from '@core/helpers/get-i18n-text';
import READ_I18N_TEXT from '@locales/read.json';
import {Chapter} from '@main/interfaces';

export interface HeaderProps {
  chapters: Chapter[];
  currentChapterId: string;
  onChangeChapter: (chapterId: string) => void;
}
const options = [
  {value: '1', text: 'Durward Reynolds s fqwf qwf ', unavailable: false},
  {value: '2', text: 'Kenton Towne', unavailable: false},
  {value: '3', text: 'Therese Wunsch', unavailable: false},
  {value: '4', text: 'Benedict Kessler', unavailable: true},
  {value: '5', text: 'Katelyn Rohan', unavailable: false},
  {value: '6', text: 'Durward Reynolds', unavailable: false},
  {value: '7', text: 'Kenton Towne', unavailable: false},
  {value: '8', text: 'Therese Wunsch', unavailable: false},
  {value: '9', text: 'Benedict Kessler', unavailable: true},
  {value: '10', text: 'Katelyn Rohan', unavailable: false},
  {value: '11', text: 'Durward Reynolds', unavailable: false},
  {value: '12', text: 'Kenton Towne', unavailable: false},
  {value: '13', text: 'Therese Wunsch', unavailable: false},
  {value: '14', text: 'Benedict Kessler', unavailable: true},
  {value: '15', text: 'Katelyn Rohan', unavailable: false},
  {value: '16', text: 'Benedict Kessler', unavailable: true},
  {value: '17', text: 'Katelyn Rohan', unavailable: false},
  {value: '18', text: 'Durward Reynolds', unavailable: false},
  {value: '19', text: 'Kenton Towne', unavailable: false},
  {value: '20', text: 'Therese Wunsch', unavailable: false},
];

export const Header = (_props: HeaderProps): JSX.Element => {
  // const {chapters, currentChapterId, onChangeChapter} = props;
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedValue, setValue] = useState('1');

  const toggleMenuVisible = (): void => {
    setMenuVisible(!menuVisible);
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
            onClick={toggleMenuVisible}
            className={`p-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80`}
            title={getI18nText(READ_I18N_TEXT, 'PREVIOUS', router)}
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
            setValue={setValue}
            options={options}
            containerClassName='flex-1 mx-2'
            optionContainerClassName='top-14 sm:top-12'
          />
          <button
            type='button'
            onClick={toggleMenuVisible}
            className={`mr-2 p-2 rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80`}
            title={getI18nText(READ_I18N_TEXT, 'PREVIOUS', router)}
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
