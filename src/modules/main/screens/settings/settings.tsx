import {useRouter} from 'next/router';
import type {NextPage} from 'next';
import {Seo} from '@core/components/seo';
import SITE_I18N_TEXT from '@locales/site.json';
import {getI18nText} from '@core/helpers/get-i18n-text';
import {LocaleSettingsContainer} from './components/locale-settings-container';
import {ThemeSettingsContainer} from './components/theme-settings-container';
import {NextChapterPreloadSettingsContainer} from './components/next-chapter-preload-settings-container';
import {ViewModeSettingsContainer} from './components/view-mode-settings-container';
import {SourceSettingsContainer} from './components/source-settings-container';

export const Settings: NextPage = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Seo title={getI18nText(SITE_I18N_TEXT, 'TAB_SETTINGS', router)} />
      <LocaleSettingsContainer />
      <ThemeSettingsContainer />
      <NextChapterPreloadSettingsContainer />
      <ViewModeSettingsContainer />
      <SourceSettingsContainer />
    </>
  );
};
