import Image from 'next/image';
import {useRouter} from 'next/router';
import type {I18nText} from '@core/interfaces';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {SITE_AUTHOR, SITE_AUTHOR_LINK} from '@core/constants';

export const FOOTER_I18N_TEXT: I18nText = {
  EN: {
    COPYRIGHT: 'Copyright © 2021',
  },
  VI: {
    COPYRIGHT: 'Bản quyền © 2021',
  },
};

export const Footer = (): JSX.Element => {
  const router = useRouter();
  return (
    <footer className='bg-white dark:bg-gray-800'>
      <div className='container mx-auto  py-4'>
        <a
          href={SITE_AUTHOR_LINK}
          target='_blank'
          rel='noopener noreferrer'
          className='mx-4 font-semibold text-sm md:text-xl text-center'
        >
          {getI18nText(FOOTER_I18N_TEXT, 'COPYRIGHT', router)}
          <span className='mx-2'>
            <Image src='/tqt-icon.svg' alt='TQT Logo' width={25} height={25} />
          </span>
          {SITE_AUTHOR}.
        </a>
      </div>
    </footer>
  );
};
