/* eslint-disable react/jsx-props-no-spreading */
import {useRouter} from 'next/router';
import type {AppProps} from 'next/app';
import {Layout} from '@core/components/layout';
import type {MenuItem} from '@core/interfaces';

export const App = ({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
