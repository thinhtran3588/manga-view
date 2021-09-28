import Head from 'next/head';
import {useRouter} from 'next/router';
import type {MenuItem} from '@core/interfaces';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SITE_I18N_TEXT from '@locales/site.json';
import {Footer} from './footer';
import {Header} from './header';

const MENU_ITEMS: MenuItem[] = [
  {
    key: 'TAB_HOME',
    href: '/',
    current: false,
    icon: '',
  },
  {
    key: 'TAB_FAVORITES',
    href: '/favorites',
    current: false,
    icon: '',
  },
  {
    key: 'TAB_SETTINGS',
    href: '/settings',
    current: false,
    icon: '',
  },
];
export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const {children} = props;
  const router = useRouter();
  const menuItems: MenuItem[] = MENU_ITEMS.map((item) => ({...item, current: router.route === item.href}));

  return (
    <div className='flex flex-col min-h-screen dark:bg-gray-800 dark:text-white'>
      <Head>
        <title>{getI18nText(SITE_I18N_TEXT, 'SITE_NAME', router)}</title>
        <meta name='description' content={getI18nText(SITE_I18N_TEXT, 'SITE_DESCRIPTION', router)} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header menuItems={menuItems} />
      <main className='flex flex-1 container mx-auto p-4'>{children}</main>
      <Footer />
    </div>
  );
};
