import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import type {NextPage} from 'next';
import {MangaList} from '@main/components/manga-list';
import {Seo} from '@core/components/seo';
import SITE_I18N_TEXT from '@locales/site.json';
import {getI18nText} from '@core/helpers/get-i18n-text';
import type {RootState} from '@store';

export const Favorites: NextPage = (): JSX.Element => {
  const router = useRouter();
  const favoriteMangasState = useSelector((state: RootState) => state.favoriteMangas);
  const favoriteMangas = useMemo(
    () => favoriteMangasState.ids.map((id) => favoriteMangasState.mangas[id]),
    [favoriteMangasState],
  );

  return (
    <>
      <Seo title={getI18nText(SITE_I18N_TEXT, 'TAB_FAVORITES', router)} />
      <MangaList mangas={favoriteMangas} />
    </>
  );
};
