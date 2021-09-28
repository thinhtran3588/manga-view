import type {NextPage} from 'next';
import {Seo} from '@core/components/seo';

export const Home: NextPage = (): JSX.Element => (
  <>
    <Seo />
    <div className='m-2'>demo</div>
  </>
);
