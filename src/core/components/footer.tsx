import Image from 'next/image';
import {useRouter} from 'next/router';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {SITE_AUTHOR, SITE_AUTHOR_LINK, VERSION} from '@core/constants';
import SITE_I18N_TEXT from '@locales/site.json';

export const Footer = (): JSX.Element => {
  const router = useRouter();
  return (
    <footer className='bg-white dark:bg-gray-800'>
      <div className='container mx-auto py-4 flex-wrap justify-between flex items-center text-sm'>
        <a
          href={SITE_AUTHOR_LINK}
          target='_blank'
          rel='noopener noreferrer'
          className='mx-4 font-semibold text-center items-center'
        >
          <span>{getI18nText(SITE_I18N_TEXT, 'CREATED_BY', router)}</span>
          <span className='mx-2'>
            <Image src='/icons/tqt-icon.svg' alt='TQT Logo' width={15} height={15} />
          </span>
          <span> {SITE_AUTHOR}.</span>
        </a>
        <span className='mx-4'>
          {getI18nText(SITE_I18N_TEXT, 'VERSION', router)}: {VERSION}
        </span>
      </div>
    </footer>
  );
};
