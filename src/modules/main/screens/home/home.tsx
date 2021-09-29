import {useRouter} from 'next/router';
import type {NextPage} from 'next';
import {Seo} from '@core/components/seo';
import {Button} from '@core/components/button';

export const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const viewManga = (): void => {
    router.push('/manga/id-1');
  };

  return (
    <>
      <Seo />
      <div className='m-2'>
        demo
        <Button onClick={viewManga}>View manga</Button>
      </div>
    </>
  );
};
