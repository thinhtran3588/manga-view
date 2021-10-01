import {useRouter} from 'next/router';
import {useDebounce} from 'use-debounce';
import {ChangeEvent, useState, useEffect, useCallback} from 'react';
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

interface MangaInfo {
  data: Manga[];
  nextToken?: string;
}

export const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce((searchTerm || '').trim(), 300);
  const [mangas, setMangas] = useImmer<MangaInfo>({data: [], nextToken: ''});
  const [loading, setLoading] = useState(false);

  const search = useCallback(
    async (newSearchTerm: string, nextToken?: string): Promise<void> => {
      if (!newSearchTerm) {
        return;
      }

      try {
        setLoading(true);
        if (!nextToken) {
          setMangas((draftState) => {
            draftState.data = [];
            draftState.nextToken = undefined;
          });
        }
        const result = await searchManga(newSearchTerm, nextToken);
        setMangas((draftState) => {
          draftState.data = [...(nextToken ? draftState.data : []), ...result.data];
          draftState.nextToken = result.pagination.nextToken;
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [setMangas],
  );

  const onLoadMore = (): void => {
    search(searchTermDebounced, mangas.nextToken);
  };

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
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
        autoFocus
      />
      <div className='flex flex-row flex-wrap'>
        {mangas.data.map((manga) => (
          <div key={manga.id} className='p-1 w-full sm:w-1/2 xl:w-1/3'>
            <MangaCard manga={manga} />
          </div>
        ))}
      </div>
      {loading && (
        <div className='w-full text-center'>
          <span>{getI18nText(HOME_I18N_TEXT, mangas.nextToken ? 'LOADING' : 'SEARCHING', router)}...</span>
        </div>
      )}
      {mangas.nextToken && !loading && (
        <Button onClick={onLoadMore} disabled={loading}>
          Load more
        </Button>
      )}
    </div>
  );
};
