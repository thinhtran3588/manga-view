import {useRouter} from 'next/router';
import {useDebounce} from 'use-debounce';
import {ChangeEvent, useState, useEffect, useCallback, useRef} from 'react';
import {useImmer} from 'use-immer';
import type {NextPage} from 'next';
import type {Manga} from '@main/interfaces';
import HOME_I18N_TEXT from '@locales/home.json';
import {Seo} from '@core/components/seo';
import {SearchBar} from '@core/components/search-bar';
import {Button} from '@core/components/button';
import {MangaCard} from '@main/components/manga-card';
import {searchManga} from '@main/services/manga/search-manga';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {handleError} from '@core/helpers/handle-error';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '@store';
import {Loading} from '@core/components/loading';

interface MangaInfo {
  data: Manga[];
  nextPage?: string;
}

export const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const searchTerm = useSelector((state: RootState) => state.homeScreen.searchTerm);
  const {
    homeScreen: {setSearchTerm},
  } = useDispatch<Dispatch>();
  const [searchTermDebounced] = useDebounce((searchTerm || '').trim(), 300);
  const [mangas, setMangas] = useImmer<MangaInfo>({data: [], nextPage: ''});
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-null/no-null
  const searchTextRef = useRef<HTMLInputElement>(null);

  const search = useCallback(
    async (newSearchTerm: string, nextPage?: string): Promise<void> => {
      if (!newSearchTerm) {
        return;
      }

      try {
        setLoading(true);
        if (!nextPage) {
          setMangas((draftState) => {
            draftState.data = [];
            draftState.nextPage = undefined;
          });
        }
        const result = await searchManga(newSearchTerm, nextPage);
        setMangas((draftState) => {
          draftState.data = [...(nextPage ? draftState.data : []), ...result.data];
          draftState.nextPage = result.pagination.nextPage;
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [setMangas],
  );

  const onLoadMore = (): void => {
    search(searchTermDebounced, mangas.nextPage);
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
  }, [search, searchTermDebounced, setMangas]);

  return (
    <div className='flex flex-col w-full'>
      <Seo />
      <SearchBar
        placeholder={getI18nText(HOME_I18N_TEXT, 'SEARCH_MANGA', router)}
        className='w-full mb-2'
        value={searchTerm}
        onChange={onSearchTextChange}
        onClearInput={onClearSearchText}
        autoFocus
        ref={searchTextRef}
      />
      <div className='flex flex-row flex-wrap'>
        {mangas.data.map((manga) => (
          <div key={manga.id} className='p-1 w-full sm:w-1/2 xl:w-1/3'>
            <MangaCard manga={manga} />
          </div>
        ))}
      </div>
      {loading && (
        <div className='w-full flex justify-center'>
          <Loading className='h-10 w-10 fill-current text-primary dark:text-primary-light' />
        </div>
      )}
      {mangas.nextPage && !loading && (
        <Button className='mt-2' onClick={onLoadMore} disabled={loading}>
          Load more
        </Button>
      )}
    </div>
  );
};
