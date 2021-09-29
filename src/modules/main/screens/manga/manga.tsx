import type {GetServerSideProps, NextPage} from 'next';
import {Seo} from '@core/components/seo';
import {Button} from '@core/components/button';

export interface MangaProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}
export const Manga: NextPage<MangaProps> = (props: MangaProps): JSX.Element => {
  const {params} = props;
  return (
    <div className='flex flex-col w-full'>
      <Seo title={params?.id} />
      {JSON.stringify(params)}
      <Button>Read</Button>
      <div className='-mx-2'>
        {Array.from(Array(20), (x, i) => i).map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src='/sample-image.jpeg' key={i} alt='Img' width='100%' />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  return {
    props: {
      params,
    },
  };
};
