import {SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL} from '@core/constants';
import Document, {Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext} from 'next/document';

class MyDocument extends Document {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  };

  render = (): JSX.Element => (
    <Html>
      <Head>
        <meta name='application-name' content={SITE_NAME} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={SITE_NAME} />
        <meta name='description' content={SITE_DESCRIPTION} />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#ffc40d' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />

        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='shortcut icon' href='/icons/favicon.ico' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:400,600,700&display=optional' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content={SITE_URL} />
        <meta name='twitter:title' content={SITE_NAME} />
        <meta name='twitter:description' content={SITE_DESCRIPTION} />
        <meta name='twitter:image' content={`${SITE_URL}/icons/android-chrome-192x192.png`} />
        <meta name='twitter:creator' content={SITE_AUTHOR} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={SITE_NAME} />
        <meta property='og:description' content={SITE_DESCRIPTION} />
        <meta property='og:site_name' content={SITE_NAME} />
        <meta property='og:url' content={SITE_URL} />
        <meta property='og:image' content={`${SITE_URL}/icons/apple-touch-icon.png`} />

        {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
