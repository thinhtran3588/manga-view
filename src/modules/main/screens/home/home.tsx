import type {NextPage} from 'next';
import {Seo} from '@core/components/seo';
import {Button} from '@core/components/button';

export const Home: NextPage = (): JSX.Element => (
  <>
    <Seo />
    <div className='m-2'>
      demo
      <Button>Test button</Button>
    </div>
  </>
);
