/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {useEffect, useState, Fragment} from 'react';
import {useImmer} from 'use-immer';
import last from 'lodash/fp/last';
import {useDispatch, useSelector} from 'react-redux';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {mangaServices} from '@api/main/services/mangas';
import {getChapterImages} from '@api/main/services/mangas/nettruyenpro/get-chapter-images';
import {Loading} from '@core/components/loading';
import {ScrollToTopButton} from '@core/components/scroll-to-top-button';
import {NoSsr} from '@core/components/no-ssr';
import {Seo} from '@core/components/seo';
import type {Chapter, Manga} from '@main/interfaces';
import {Dispatch, RootState} from '@store';
import MAIN_I18N_TEXT from '@locales/main.json';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {Nav} from './components/nav';

export interface ReadProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manga: Manga;
  chapter: Chapter;
  nextChapter: Chapter;
  params: unknown;
}

export const Read: NextPage<ReadProps> & {hideLayout?: boolean} = (props: ReadProps): JSX.Element => {
  const {manga, chapter, nextChapter} = props;
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const preloadNextChapter = useSelector((state: RootState) => state.nextChapter.preload);
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);
  const {
    recentMangas: {addRecentManga},
  } = useDispatch<Dispatch>();
  const [readyStates, setReadyStates] = useImmer<{[id: string]: boolean}>({});

  const router = useRouter();

  const onImageLoaded = (imageIndex: number): void => {
    setReadyStates((draftState) => {
      draftState[imageIndex.toString()] = true;
    });
  };

  useEffect(() => {
    if (chapter.id === '0' && manga.chapters && manga.chapters.length > 0) {
      setLoading(true);
      const lastChapter = last(manga.chapters);
      router.push(`/read/${manga.sourceId}/${manga.id}/${lastChapter?.id}`);
    }
    if (chapter.id !== '0') {
      addRecentManga({manga, chapterId: chapter.id});
    }
  }, [manga, chapter, router, addRecentManga]);

  useEffect(() => {
    setLoading(false);
    setReadyStates((draftState) => {
      Object.keys(draftState).forEach((key: string) => {
        delete draftState[key];
      });
    });
    setCurrentImageIndex(0);
  }, [manga, chapter, setReadyStates]);

  useEffect(() => {
    if (viewMode === '0') {
      document.getElementById(`img-${currentImageIndex}`)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, [viewMode, currentImageIndex]);

  return (
    <div className='font-roboto flex flex-col min-h-screen max-h-screen dark:text-white bg-gray-200 dark:bg-gray-700'>
      <Seo title={`${manga.name} - ${chapter.name}`} description={manga.description} imageUrl={manga.coverUrl} />
      <NoSsr>
        <Nav
          chapters={manga.chapters || []}
          manga={manga}
          currentChapter={chapter}
          setLoading={setLoading}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
        <main
          className={clsx(
            `flex flex-1 container mx-auto max-w-3xl mb-14 lg:mt-14 lg:mb-0 
              dark:text-white bg-gray-200 dark:bg-gray-700`,
            viewMode === '0' ? '' : 'max-h-screen overflow-hidden',
          )}
        >
          <div className='flex flex-col w-full flex-1 justify-center'>
            {loading && (
              <div className='w-full flex items-center justify-center my-2 flex-1'>
                <Loading className='h-10 w-10 text-primary dark:text-primary-light' />
              </div>
            )}
            {!loading &&
              chapter.imageUrls?.map((imageUrl, i) => (
                <Fragment key={imageUrl}>
                  {!readyStates[i.toString()] && (viewMode === '0' || currentImageIndex === i) && (
                    <div className='w-full p-2 flex flex-col justify-center items-center'>
                      <Loading className='h-6 w-6 text-primary dark:text-primary-light' />
                      <span>
                        {getI18nText(MAIN_I18N_TEXT, 'MANGA_IMAGE', router)} {i + 1}
                      </span>
                    </div>
                  )}
                  <img
                    id={`img-${i}`}
                    src={imageUrl}
                    alt={`img${i}`}
                    width={readyStates[i.toString()] && (viewMode === '0' || currentImageIndex === i) ? '100%' : '0%'}
                    className={clsx(
                      'transition-opacity duration-1000',
                      readyStates[i.toString()] ? 'opacity-100' : 'opacity-0',
                      viewMode === '1' && currentImageIndex === i ? 'object-contain' : '',
                      readyStates[i.toString()] && viewMode === '1' && currentImageIndex === i ? 'h-full' : '',
                    )}
                    onLoad={() => onImageLoaded(i)}
                  />
                </Fragment>
              ))}
            {preloadNextChapter && nextChapter && (
              <div className='next-chapter h-0'>
                {nextChapter.imageUrls?.map((imageUrl) => (
                  <img key={imageUrl} src={imageUrl} alt='' width='0%' className='min-h-x' />
                ))}
              </div>
            )}
          </div>
        </main>
        <ScrollToTopButton className='bottom-16 lg:bottom-10 right-10' />
      </NoSsr>
    </div>
  );
};

Read.hideLayout = true;

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const sourceId = (params?.sourceId as string) || '1';
  const mangaId = params?.mangaId as string;
  let manga = {
    sourceId,
    id: '',
    author: '',
    coverUrl: '',
    description: '',
    lastUpdated: '',
    name: '',
    otherName: '',
    status: '',
    genres: [],
    chapters: [],
  } as Manga;
  if (mangaId) {
    manga = await mangaServices[sourceId].getManga(params?.mangaId as string);
  }

  const chapterId = params?.chapterId as string;
  const chapter = {
    id: chapterId,
    name: manga.chapters?.find((c) => c.id === chapterId)?.name || '',
    mangaId: manga.id,
    imageUrls: [],
    originalUrl: '',
  } as Chapter;
  if (mangaId && chapterId && chapterId !== '0') {
    chapter.imageUrls = await mangaServices[sourceId].getChapterImages(manga, chapterId);
  }

  // clear chapter urls
  manga.chapters?.map((c) => ({...c, originalUrl: ''}));

  // get next chapter
  // eslint-disable-next-line no-null/no-null
  let nextChapter: Chapter | null = null;
  const currentChapterIndex = manga.chapters?.findIndex((c) => c.id === chapterId);
  if (
    currentChapterIndex !== undefined &&
    manga.chapters &&
    currentChapterIndex > -1 &&
    currentChapterIndex < manga.chapters?.length - 1
  ) {
    const nextChapterImageUrls = await getChapterImages(manga, manga.chapters[currentChapterIndex + 1].id);
    nextChapter = {
      ...manga.chapters[currentChapterIndex + 1],
      imageUrls: nextChapterImageUrls,
      originalUrl: '',
    };
  }

  return {
    props: {
      manga: {
        ...manga,
        chapters: manga.chapters?.map((c) => ({...c, originalUrl: ''})),
      },
      chapter,
      nextChapter,
    },
    revalidate: 60 * 60 * 4,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({paths: [], fallback: 'blocking'});
