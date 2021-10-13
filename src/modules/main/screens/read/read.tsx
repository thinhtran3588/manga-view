import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import last from 'lodash/fp/last';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {getManga} from '@api/main/services/mangas/get-manga';
import {getChapterImages} from '@api/main/services/mangas/get-chapter-images';
import {Loading} from '@core/components/loading';
import {Seo} from '@core/components/seo';
import type {Chapter, Manga} from '@main/interfaces';
import {Nav} from './components/nav';

export interface ReadProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manga: Manga;
  chapter: Chapter;
  params: unknown;
}
export const Read: NextPage<ReadProps> & {hideLayout?: boolean} = (props: ReadProps): JSX.Element => {
  const {manga, chapter} = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (chapter.id === '0' && manga.chapters && manga.chapters.length > 0) {
      setLoading(true);
      const lastChapter = last(manga.chapters);
      router.push(`/read/${manga.id}/${lastChapter?.id}`);
    }
  }, [manga, chapter, router]);

  useEffect(() => {
    setLoading(false);
  }, [manga]);

  return (
    <div className='font-roboto flex flex-col h-screen dark:text-white'>
      <Seo title={`${manga.name} - ${chapter.name}`} description={manga.description} imageUrl={manga.coverUrl} />
      <Nav chapters={manga.chapters || []} mangaId={manga.id} currentChapterId={chapter.id} setLoading={setLoading} />
      <main className='flex flex-1 container mx-auto pt-0 lg:pt-14 mb-14 pb-14 lg:mb-0 bg-gray-200 dark:bg-gray-700'>
        <div className='flex flex-col w-full'>
          {loading && (
            <div className='w-full flex justify-center my-2'>
              <Loading className='h-10 w-10 fill-current text-primary dark:text-primary-light' />
            </div>
          )}
          {!loading &&
            chapter.imageUrls?.map((imageUrl, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} key={imageUrl} alt={`img${i}`} width='100%' />
            ))}
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

  return {
    props: {
      manga: {
        ...manga,
        chapters: manga.chapters?.map((c) => ({...c, originalUrl: ''})),
      },
      chapter,
    },
    revalidate: 60 * 60 * 4,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({paths: [], fallback: 'blocking'});
