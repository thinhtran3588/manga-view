/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import {Provider, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import type {AppProps} from 'next/app';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SITE_I18N_TEXT from '@locales/site.json';
import {Layout} from '@core/components/layout';
import {RootState, store} from '@store';
import type {NextComponentType, NextPageContext} from 'next';

interface BaseAppProps {
  Component: NextComponentType<NextPageContext, any, {}> & {
    hideLayout?: boolean;
  };
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

  if (Component.hideLayout) {
    return (
      <>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>{getI18nText(SITE_I18N_TEXT, 'SITE_NAME', router)}</title>
          <meta name='description' content={getI18nText(SITE_I18N_TEXT, 'SITE_DESCRIPTION', router)} />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{getI18nText(SITE_I18N_TEXT, 'SITE_NAME', router)}</title>
        <meta name='description' content={getI18nText(SITE_I18N_TEXT, 'SITE_DESCRIPTION', router)} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export const App = ({Component, pageProps}: AppProps): JSX.Element => (
  <Provider store={store}>
    <BaseApp Component={Component} pageProps={pageProps} />
  </Provider>
);
