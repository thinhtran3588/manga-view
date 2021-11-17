import clsx from 'clsx';
import {useRouter} from 'next/router';
import BookOpenIcon from '@heroicons/react/outline/BookOpenIcon';
import HomeIcon from '@heroicons/react/outline/HomeIcon';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SITE_I18N_TEXT from '@locales/site.json';
import READ_I18N_TEXT from '@locales/read.json';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import CONSTANTS from '@core/constants.json';

export interface MenuItemsProps {
  visible: boolean;
  viewMode: string;
  toggleViewMode: () => void;
  viewDetail: () => void;
}

const DEFAULT_BUTTON_CLASS = `fixed -bottom-4 p-2 shadow-xl rounded-full disabled:opacity-50
              bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80
              hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600
              transition transform`;

export const MenuItems = (props: MenuItemsProps): JSX.Element => {
  const {visible, viewMode, toggleViewMode, viewDetail} = props;
  const router = useRouter();

  const gotoHome = (): void => {
    router.push('/');
  };

  return (
    <>
      <div className={clsx('transition-opacity duration-700 lg:hidden', visible ? 'opacity-100' : 'opacity-0')}>
        <button
          type='button'
          onClick={gotoHome}
          className={clsx(DEFAULT_BUTTON_CLASS, `duration-500 left-4`, visible ? '-translate-y-20' : 'translate-y-40')}
          title={getI18nText(SITE_I18N_TEXT, 'SCROLL_TO_TOP', router)}
        >
          <HomeIcon className='h-6 w-6' />
        </button>
        <button
          type='button'
          onClick={viewDetail}
          className={clsx(DEFAULT_BUTTON_CLASS, `duration-700 left-16`, visible ? '-translate-y-20' : 'translate-y-40')}
          title={getI18nText(READ_I18N_TEXT, 'VIEW_DETAIL', router)}
        >
          <BookOpenIcon className='h-6 w-6' />
        </button>
        <button
          type='button'
          onClick={toggleViewMode}
          className={clsx(
            DEFAULT_BUTTON_CLASS,
            `duration-1000 left-28`,
            visible ? '-translate-y-20' : 'translate-y-40',
          )}
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
      </div>
    </>
  );
};
