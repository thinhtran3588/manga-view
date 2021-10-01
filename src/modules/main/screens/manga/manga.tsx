import Link from 'next/link';
import type {GetServerSideProps, NextPage} from 'next';
import {Seo} from '@core/components/seo';
import {MangaCard} from '@main/components/manga-card';
import type {Chapter, Manga} from '@main/interfaces';
import {Card} from '@core/components/card';
import clsx from 'clsx';

export interface MangaProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manga: Manga;
}
export const MangaScreen: NextPage<MangaProps> = (props: MangaProps): JSX.Element => {
  const {manga} = props;
  return (
    <div className='flex flex-col w-full'>
      <Seo title={manga.name} />
      <MangaCard manga={manga} mode='full' className='mb-2' />
      {manga.chapters && manga.chapters.length > 0 && (
        <Card title='Chapters'>
          {manga.chapters.map((chapter, i) => (
            <Link href='/' key={chapter.id}>
              <a
                className={clsx(
                  'block w-full p-3 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-500 ',
                  i % 2 === 0 ? '' : 'bg-gray-200 dark:bg-gray-700',
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

export const getServerSideProps: GetServerSideProps = async (_context) => {
  // const {params} = context;
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
    },
  };
};
