import {useRouter} from 'next/router';
import Head from 'next/head';
import SITE_I18N_TEXT from '@locales/site.json';
import {getI18nText} from '@core/helpers/get-i18n-text';
import CONSTANTS from '@core/constants.json';

const {SITE_AUTHOR, SITE_URL} = CONSTANTS;
export interface SeoProps {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const Seo = (props: SeoProps): JSX.Element => {
  const {url, title, description, imageUrl} = props;
  const router = useRouter();
  const siteTitle = getI18nText(SITE_I18N_TEXT, 'SITE_NAME', router);
  const siteDescription = getI18nText(SITE_I18N_TEXT, 'SITE_DESCRIPTION', router);
  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;
  const pageImageUrl = imageUrl || `${process.env.NEXT_PUBLIC_SITE_URL || SITE_URL}/icons/app-icon-200x200.png`;

  return (
    <Head>
      <title key='title'>{pageTitle}</title>
      <meta name='description' content={pageDescription} key='description' />
      <meta name='twitter:card' content='summary' key='twitter-card' />
      <meta name='twitter:title' content={pageTitle} key='twitter-title' />
      <meta name='twitter:description' content={pageDescription} key='twitter-description' />
      <meta name='twitter:image' content={pageImageUrl} key='twitter-image' />
      <meta name='twitter:creator' content={SITE_AUTHOR} key='twitter-creator' />
      <meta property='og:type' content='website' key='og-type' />
      <meta property='og:title' content={pageTitle} key='og-title' />
      <meta property='og:description' content={pageDescription} key='og-description' />
      <meta property='og:image' content={pageImageUrl} key='og-image' />
      {url && (
        <>
          <meta name='twitter:url' content={url} key='twitter-url' />
          <meta property='og:url' content={url} key='og-url' />
          <link rel='canonical' href={url} key='canonical' />
        </>
      )}
    </Head>
  );
};
