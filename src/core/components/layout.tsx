import {useRouter} from 'next/router';
import TemplateIcon from '@heroicons/react/outline/TemplateIcon';
import TemplateIconSolid from '@heroicons/react/solid/TemplateIcon';
import HeartIcon from '@heroicons/react/outline/HeartIcon';
import HeartIconSolid from '@heroicons/react/solid/HeartIcon';
import ClockIcon from '@heroicons/react/outline/ClockIcon';
import ClockIconIconSolid from '@heroicons/react/solid/ClockIcon';
import CogIcon from '@heroicons/react/outline/CogIcon';
import CogIconSolid from '@heroicons/react/solid/CogIcon';
import type {MenuItem} from '@core/interfaces';
import {Nav} from './nav';

const MENU_ITEMS: MenuItem[] = [
  {
    key: 'TAB_HOME',
    href: '/',
    current: false,
    icon: <TemplateIcon className='w-6 h-6' />,
    focusedIcon: <TemplateIconSolid className='w-6 h-6' />,
  },
  {
    key: 'TAB_RECENT',
    href: '/recent',
    current: false,
    icon: <ClockIcon className='w-6 h-6' />,
    focusedIcon: <ClockIconIconSolid className='w-6 h-6' />,
  },
  {
    key: 'TAB_FAVORITES',
    href: '/favorites',
    current: false,
    icon: <HeartIcon className='w-6 h-6' />,
    focusedIcon: <HeartIconSolid className='w-6 h-6' />,
  },
  {
    key: 'TAB_SETTINGS',
    href: '/settings',
    current: false,
    icon: <CogIcon className='w-6 h-6' />,
    focusedIcon: <CogIconSolid className='w-6 h-6' />,
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
    <div
      className={`font-roboto min-h-screen max-h-screen 
        transition-all duration-700 bg-gray-200 dark:bg-gray-700 dark:text-white flex`}
    >
      <Nav menuItems={menuItems} />
      <main className='mx-auto container p-2 flex-1 overflow-auto mb-14 md:mb-0'>{children}</main>
    </div>
  );
};
