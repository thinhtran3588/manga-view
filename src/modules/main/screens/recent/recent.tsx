import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import type {NextPage} from 'next';
import {MangaList} from '@main/components/manga-list';
import {Seo} from '@core/components/seo';
import SITE_I18N_TEXT from '@locales/site.json';
import {getI18nText} from '@core/helpers/get-i18n-text';
import type {RootState} from '@store';

export const Recent: NextPage = (): JSX.Element => {
  const router = useRouter();
  const recentMangasState = useSelector((state: RootState) => state.recentMangas);
  const recentMangas = useMemo(
    () => recentMangasState.ids.map((id) => recentMangasState.mangas[id]),
    [recentMangasState],
  );

  return (
    <>
      <Seo title={getI18nText(SITE_I18N_TEXT, 'TAB_RECENT', router)} />
      <MangaList mangas={recentMangas} />
    </>
  );
};
