import {useRouter} from 'next/router';
import {getI18nText} from '@core/helpers/get-i18n-text';
import CONSTANTS from '@core/constants.json';
import SITE_I18N_TEXT from '@locales/site.json';
import {TqtIcon} from './tqt-icon';

const {SITE_AUTHOR, SITE_AUTHOR_LINK, VERSION} = CONSTANTS;

export const Footer = (): JSX.Element => {
  const router = useRouter();
  return (
    <footer className='flex flex-col text-sm p-2'>
      <span className='font-semibold'>
        {getI18nText(SITE_I18N_TEXT, 'VERSION', router)}: {VERSION}
      </span>
      <a href={SITE_AUTHOR_LINK} target='_blank' rel='noopener noreferrer' className='flex'>
        <span>{getI18nText(SITE_I18N_TEXT, 'CREATED_BY', router)}</span>
        <TqtIcon className='w-4 h-4 mx-2' />
        <span> {SITE_AUTHOR}.</span>
      </a>
    </footer>
  );
};
