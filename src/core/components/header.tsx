import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import type {MenuItem} from '@core/interfaces';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SITE_I18N_TEXT from '@locales/site.json';
import {Logo} from './logo';

export interface HeaderProps {
  menuItems: MenuItem[];
}

export const Header = (props: HeaderProps): JSX.Element => {
  const {menuItems} = props;
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenuVisible = (): void => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = (): void => setMenuVisible(false);

  return (
    <header
      className='sticky top-0 backdrop-filter backdrop-blur  
    firefox:bg-opacity-90 shadow-xl z-50'
    >
      <div className='container mx-auto'>
        <div className='flex items-center flex-wrap'>
          <Link href='/'>
            <a className='block mx-4 my-2' title={getI18nText(SITE_I18N_TEXT, 'TAB_HOME', router)}>
              <Logo className='h-8' />
            </a>
          </Link>
          <div className='lg:hidden flex flex-1 justify-end'>
            <button
              type='button'
              onClick={toggleMenuVisible}
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600'
              title={getI18nText(SITE_I18N_TEXT, menuVisible ? 'CLOSE' : 'MENU', router)}
            >
              {menuVisible ? (
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    // eslint-disable-next-line max-len
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    // eslint-disable-next-line max-len
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
          </div>
          <div className='block w-full lg:hidden' />
          <nav className={clsx('flex flex-col lg:flex-row w-full lg:w-auto', menuVisible ? '' : 'hidden lg:flex')}>
            {menuItems.map((item, index) => (
              <Link href={item.href} key={item.href}>
                <a
                  className={clsx(
                    `block px-8 py-4 font-semibold text-xl border-b-4
                    hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-100 dark:hover:border-gray-600`,
                    item.current
                      ? `border-primary hover:border-primary text-primary
                         dark:border-primary-light dark:hover:border-primary-light dark:text-primary-light`
                      : 'border-transparent',
                  )}
                  onClick={closeMenu}
                  role='link'
                  tabIndex={index}
                  aria-hidden='true'
                >
                  {getI18nText(SITE_I18N_TEXT, item.key, router)}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
