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
      <title>{pageTitle}</title>
      <meta name='description' content={pageDescription} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={pageDescription} />
      <meta name='twitter:image' content={pageImageUrl} />
      <meta name='twitter:creator' content={SITE_AUTHOR} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageImageUrl} />
      {url && (
        <>
          <meta name='twitter:url' content={url} />
          <meta property='og:url' content={url} />
          <link rel='canonical' href={url} />
        </>
      )}
    </Head>
  );
};
