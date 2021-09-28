/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import {Provider, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import type {AppProps} from 'next/app';
import {Layout} from '@core/components/layout';
import {RootState, store} from '@store';
import type {NextComponentType, NextPageContext} from 'next';

interface BaseAppProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const BaseApp = ({Component, pageProps}: BaseAppProps): JSX.Element => {
  const locale = useSelector((state: RootState) => state.settings.locale);
  const theme = useSelector((state: RootState) => state.settings.theme);
  const router = useRouter();

  useEffect(() => {
    if (locale !== router.locale) {
      router.push(router.route, undefined, {locale});
    }
  }, [locale, router]);

  useEffect(() => {
    if (theme === 'dark' || (theme === '' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export const App = ({Component, pageProps}: AppProps): JSX.Element => (
  <Provider store={store}>
    <BaseApp Component={Component} pageProps={pageProps} />
  </Provider>
);
