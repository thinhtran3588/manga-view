import {useRouter} from 'next/router';
import {useDebounce} from 'use-debounce';
import {ChangeEvent, useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {useImmer} from 'use-immer';
import {useDispatch, useSelector} from 'react-redux';
import type {NextPage} from 'next';
import type {Manga} from '@main/interfaces';
import HOME_I18N_TEXT from '@locales/home.json';
import MAIN_I18N_TEXT from '@locales/main.json';
import {Seo} from '@core/components/seo';
import {SearchBar} from '@core/components/search-bar';
import {Button} from '@core/components/button';
import {searchManga} from '@main/services/manga/search-manga';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {handleError} from '@core/helpers/handle-error';
import {Dispatch, RootState} from '@store';
import {Loading} from '@core/components/loading';
import {MangaList} from '@main/components/manga-list';
import {NoSsr} from '@core/components/no-ssr';

interface MangaInfo {
  data: Manga[];
  nextPage?: string;
}

export const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const searchTerm = useSelector((state: RootState) => state.homeScreen.searchTerm);
  const recentMangasState = useSelector((state: RootState) => state.recentMangas);
  const recentMangas = useMemo(
    () => recentMangasState.ids.map((id) => recentMangasState.mangas[id]),
    [recentMangasState],
  );
  const {
    homeScreen: {setSearchTerm},
  } = useDispatch<Dispatch>();
  const [searchTermDebounced] = useDebounce((searchTerm || '').trim(), 300);
  const [searchMangas, setSearchMangas] = useImmer<MangaInfo>({data: [], nextPage: ''});
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-null/no-null
  const searchTextRef = useRef<HTMLInputElement>(null);

  const search = useCallback(
    async (newSearchTerm: string, nextPage?: string): Promise<void> => {
      if (!newSearchTerm) {
        setSearchMangas((draftState) => {
          draftState.data = [];
          draftState.nextPage = undefined;
        });
        return;
      }

      try {
        setLoading(true);
        if (!nextPage) {
          setSearchMangas((draftState) => {
            draftState.data = [];
            draftState.nextPage = undefined;
          });
        }
        const result = await searchManga(newSearchTerm, nextPage);
        setSearchMangas((draftState) => {
          draftState.data = [...(nextPage ? draftState.data : []), ...result.data];
          draftState.nextPage = result.pagination.nextPage;
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [setSearchMangas],
  );

  const onLoadMore = (): void => {
    search(searchTermDebounced, searchMangas.nextPage);
  };

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const onClearSearchText = (): void => {
    setSearchTerm('');
    searchTextRef.current?.focus();
  };

  useEffect(() => {
    search(searchTermDebounced);
  }, [search, searchTermDebounced, setSearchMangas]);

  return (
    <div className='flex flex-col w-full h-full flex-1 relative pt-12 '>
      <Seo />
      <div className='absolute top-0 inset-x-0 bg-gray-200 dark:bg-gray-700'>
        <SearchBar
          placeholder={getI18nText(HOME_I18N_TEXT, 'SEARCH_MANGA', router)}
          className='w-full'
          value={searchTerm}
          onChange={onSearchTextChange}
          onClearInput={onClearSearchText}
          autoFocus
          ref={searchTextRef}
        />
      </div>
      <div className='h-full overflow-auto'>
        <NoSsr>
          {!searchTermDebounced && !loading && recentMangas.length > 0 && (
            <MangaList mangas={recentMangas} title={getI18nText(HOME_I18N_TEXT, 'RECENT', router)} />
          )}
        </NoSsr>
        {searchTermDebounced && (
          <>
            <MangaList mangas={searchMangas.data} />
            {loading && (
              <div className='w-full flex items-center justify-center my-2 flex-1'>
                <Loading className='h-10 w-10 text-primary dark:text-primary-light' />
              </div>
            )}
            {!loading && searchMangas.data.length === 0 && (
              <div className='w-full flex items-center justify-center my-2 flex-1'>
                {getI18nText(MAIN_I18N_TEXT, 'NO_MANGAS_FOUND', router)}
              </div>
            )}
            {searchMangas.nextPage && !loading && (
              <Button className='mt-2' onClick={onLoadMore} disabled={loading}>
                {getI18nText(MAIN_I18N_TEXT, 'VIEW_MORE', router)}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
