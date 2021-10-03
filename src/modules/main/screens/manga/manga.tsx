import Link from 'next/link';
import clsx from 'clsx';
import reverse from 'lodash/fp/reverse';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Seo} from '@core/components/seo';
import {MangaCard} from '@main/components/manga-card';
import type {Chapter, Manga} from '@main/interfaces';
import {Card} from '@core/components/card';

export interface MangaProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manga: Manga;
}
export const MangaScreen: NextPage<MangaProps> = (props: MangaProps): JSX.Element => {
  const {manga} = props;
  const displayChapters = reverse(manga.chapters || []);

  return (
    <div className='flex flex-col w-full'>
      <Seo title={manga.name} description={manga.description} imageUrl={manga.coverUrl} />
      <MangaCard manga={manga} mode='full' className='mb-2' />
      {displayChapters && displayChapters.length > 0 && (
        <Card title='Chapters'>
          {displayChapters.map((chapter, i) => (
            <Link href='/' key={chapter.id}>
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
        </Card>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;

  const manga: Manga = {
    id: 'abcs scc',
    name: `name `,
    otherName: `otherName `,
    author: `author `,
    status: `status `,
    lastUpdated: `lastUpdated`,
    // eslint-disable-next-line max-len
    description: `description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description`,
    genres: [`kid`, 's', 'sss', 'scc', 'ss'],
    chapters: Array.from(Array(20), (x, i) => i).map(
      (i) =>
        ({
          id: i.toString(),
          name: `name ${i}`,
          mangaId: 'id',
          imageUrls: [],
        } as Chapter),
    ),
  } as Manga;

  return {
    props: {
      manga,
      params,
    },
    revalidate: 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({paths: [], fallback: 'blocking'});
