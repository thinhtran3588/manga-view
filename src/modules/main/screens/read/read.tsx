/* eslint-disable @next/next/no-img-element */
import {useRouter} from 'next/router';
import {useEffect, useState, Fragment} from 'react';
import {useImmer} from 'use-immer';
import last from 'lodash/fp/last';
import {useDispatch, useSelector} from 'react-redux';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {getManga} from '@api/main/services/mangas/get-manga';
import {getChapterImages} from '@api/main/services/mangas/get-chapter-images';
import {Loading} from '@core/components/loading';
import {Seo} from '@core/components/seo';
import type {Chapter, Manga} from '@main/interfaces';
import {Dispatch, RootState} from '@store';
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
  const preloadNextChapter = useSelector((state: RootState) => state.nextChapter.preload);
  const {
    recentMangas: {addRecentManga},
  } = useDispatch<Dispatch>();
  const [readyStates, setReadyStates] = useImmer<{[id: number]: boolean}>({});

  const router = useRouter();

  const onImageLoaded = (imageIndex: number): void => {
    setReadyStates((draftState) => {
      draftState[imageIndex] = true;
    });
  };

  useEffect(() => {
    if (chapter.id === '0' && manga.chapters && manga.chapters.length > 0) {
      setLoading(true);
      const lastChapter = last(manga.chapters);
      router.push(`/read/${manga.id}/${lastChapter?.id}`);
    }
    if (chapter.id !== '0') {
      addRecentManga({manga, chapterId: chapter.id});
    }
  }, [manga, chapter, router, addRecentManga]);

  useEffect(() => {
    setLoading(false);
  }, [manga, chapter]);

  return (
    <div className='font-roboto flex flex-col min-h-screen dark:text-white bg-gray-200 dark:bg-gray-700'>
      <Seo title={`${manga.name} - ${chapter.name}`} description={manga.description} imageUrl={manga.coverUrl} />
      <Nav chapters={manga.chapters || []} mangaId={manga.id} currentChapterId={chapter.id} setLoading={setLoading} />
      <main className='flex flex-1 container mx-auto pt-0 lg:pt-14 pb-14 lg:pb-0 max-w-6xl'>
        <div className='flex flex-col w-full'>
          {loading && (
            <div className='w-full flex items-center justify-center my-2 flex-1'>
              <Loading className='h-10 w-10 text-primary dark:text-primary-light' />
            </div>
          )}
          {!loading &&
            chapter.imageUrls?.map((imageUrl, i) => (
              <Fragment key={imageUrl}>
                {!readyStates[i] && (
                  <div className='w-full p-2 flex flex-col justify-center items-center'>
                    <Loading className='h-6 w-6 text-primary dark:text-primary-light' />
                    <span>img{i}</span>
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt={`img${i}`}
                  width={readyStates[i] ? '100%' : '0%'}
                  className='min-h-x'
                  onLoad={() => onImageLoaded(i)}
                />
              </Fragment>
            ))}
          {preloadNextChapter && nextChapter && (
            <div className='next-chapter'>
              {nextChapter.imageUrls?.map((imageUrl, i) => (
                <img src={imageUrl} alt={`img${i}`} width='0%' className='min-h-x' onLoad={() => onImageLoaded(i)} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

Read.hideLayout = true;

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const mangaId = params?.mangaId as string;
  let manga = {
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
    manga = await getManga(params?.mangaId as string);
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
    chapter.imageUrls = await getChapterImages(manga, chapterId);
  }

  // clear chapter urls
  manga.chapters?.map((c) => ({...c, originalUrl: ''}));

  // get next chapter
  let nextChapter: Chapter | undefined;
  const currentChapterIndex = manga.chapters?.findIndex((c) => c.id === chapterId);
  if (
    currentChapterIndex !== undefined &&
    manga.chapters &&
    currentChapterIndex > -1 &&
    currentChapterIndex < manga.chapters?.length
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
