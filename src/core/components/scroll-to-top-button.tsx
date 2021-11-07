import clsx from 'clsx';
import {useEffect, useState} from 'react';
import debounce from 'lodash/fp/debounce';
import {useRouter} from 'next/router';
import {animateScroll} from 'react-scroll';
import ChevronDoubleUpIcon from '@heroicons/react/outline/ChevronDoubleUpIcon';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SITE_I18N_TEXT from '@locales/site.json';

export interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = (props: ScrollToTopButtonProps): JSX.Element => {
  const {className = 'bottom-10 right-10'} = props;
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const scrollToTop = (): void => {
    animateScroll.scrollToTop();
  };

  const scrollEvent = debounce(100, () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    setVisible(st > lastScrollTop);
    setLastScrollTop(st <= 0 ? 0 : st);
  });

  useEffect(() => {
    // stackoverflow.com/questions/31223341/detecting-scroll-direction
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [lastScrollTop, scrollEvent]);

  return (
    <div className={clsx('transition-opacity duration-700', visible ? 'opacity-100' : 'opacity-0')}>
      <button
        type='button'
        onClick={scrollToTop}
        className={clsx(
          `fixed p-2 rounded-full shadow-xl bg-gradient dark:bg-gradient-light text-white 
            transition duration-700 transform`,
          className,
          visible ? 'translate-y-0' : 'translate-y-20',
        )}
        title={getI18nText(SITE_I18N_TEXT, 'SCROLL_TO_TOP', router)}
      >
        <ChevronDoubleUpIcon className='h-8 w-8' />
      </button>
    </div>
  );
};
