import Link from 'next/link';
import clsx from 'clsx';
import reverse from 'lodash/fp/reverse';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Seo} from '@core/components/seo';
import type {Manga} from '@main/interfaces';
import {Card} from '@core/components/card';
import {MangaCard} from '@main/components/manga-card';
import {mangaServices} from '@api/main/services/mangas';

export interface MangaProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manga: Manga;
}
export const MangaScreen: NextPage<MangaProps> = (props: MangaProps): JSX.Element => {
  const {manga} = props;
  const displayChapters = reverse(manga.chapters || []);

  return (
    <div className='flex w-full flex-wrap'>
      <Seo title={manga.name} description={manga.description} imageUrl={manga.coverUrl} />
      <div className='mb-2 w-full lg:w-1/2'>
        <MangaCard manga={manga} mode='full' className='h-full' />
      </div>
      <div className='mb-2 w-full lg:w-1/2 lg:pl-2'>
        <Card title='Chapters' contentClassName='h-full'>
          <div>
            {displayChapters.map((chapter, i) => (
              <Link href={`/read/${manga.id}/${chapter.id}`} key={chapter.id}>
                <a
                  className={clsx(
                    'block w-full p-3 hover:bg-primary hover:text-white dark:hover:bg-primary-light',
                    i % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-300 dark:bg-gray-800',
                  )}
                >
                  {chapter.name}
                </a>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const sourceId = (context.params?.sourceId as string) || '1';
  const id = context.params?.id;
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
  } as Manga;
  if (sourceId && id) {
    manga = await mangaServices[sourceId].getManga(id as string);
  }

  return {
    props: {
      manga,
    },
    revalidate: 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({paths: [], fallback: 'blocking'});
