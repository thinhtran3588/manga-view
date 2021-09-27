import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {MenuItem} from '@core/interfaces';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {SITE_I18N_TEXT} from '@core/constants';
import {Logo} from './logo';

export interface HeaderProps {
  menuItems: MenuItem[];
}

export const Header = (props: HeaderProps): JSX.Element => {
  const {menuItems} = props;
  const router = useRouter();

  return (
    <header
      className='sticky top-0 backdrop-filter backdrop-blur  
    firefox:bg-opacity-90 shadow-xl'
    >
      <div className='container mx-auto'>
        <div className='flex items-center'>
          <Link href='/'>
            <a className='block mr-8'>
              <Logo width={250} height={48} />
            </a>
          </Link>
          <nav className='flex'>
            {menuItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <a
                  className={clsx(
                    'block border-b-8 px-8 py-4 font-semibold text-xl',
                    item.current ? 'border-blue-500' : 'border-white',
                  )}
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
