import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Footer} from '@core/components/footer';
import {Seo} from '@core/components/seo';
import type {Chapter, Manga} from '@main/interfaces';
import {Header} from './components/header';

export interface ReadProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manga: Manga;
  chapter: Chapter;
  params: unknown;
}
export const Read: NextPage<ReadProps> & {hideLayout?: boolean} = (props: ReadProps): JSX.Element => {
  const {manga, chapter} = props;

  const onChangeChapter = (_chapterId: string): void => {
    // console.log(chapterId);
  };

  return (
    <div className='font-roboto flex flex-col min-h-screen bg-gray-200 dark:bg-gray-700 dark:text-white'>
      <Seo title={manga.name} description={manga.description} imageUrl={manga.coverUrl} />
      <Header chapters={manga.chapters || []} currentChapterId={chapter.id} onChangeChapter={onChangeChapter} />
      <main className='flex flex-1 container mx-auto'>
        <div className='flex flex-col w-full'>
          {chapter.imageUrls.map((imageUrl, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} key={imageUrl} alt={`img${i}`} width='100%' />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

Read.hideLayout = true;

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const manga = {
    id: params?.mangaId,
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
        } as Chapter),
    ),
  } as Manga;

  const chapter = {
    id: params?.chapterId,
    name: 'chapter 1',
    mangaId: manga.id,
    imageUrls: Array.from(Array(20), (x, i) => i).map(() => '/sample-image.jpeg'),
  } as Chapter;

  return {
    props: {
      manga,
      chapter,
    },
    revalidate: 60 * 60 * 4,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({paths: [], fallback: 'blocking'});
