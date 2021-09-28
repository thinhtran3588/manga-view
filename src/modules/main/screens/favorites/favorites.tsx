import {useRouter} from 'next/router';
import type {NextPage} from 'next';
import {Seo} from '@core/components/seo';
import SITE_I18N_TEXT from '@locales/site.json';
import {getI18nText} from '@core/helpers/get-i18n-text';

export const Favorites: NextPage = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Seo title={getI18nText(SITE_I18N_TEXT, 'TAB_FAVORITES', router)} />
      <div className=''>Favorite</div>
    </>
  );
};
