import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Dispatch, RootState} from '@store';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import {BaseSettings} from './base-settings';

export const NextChapterPreloadSettingsContainer = (): JSX.Element => {
  const preload = useSelector((state: RootState) => state.nextChapter.preload);
  const {
    nextChapter: {togglePreload},
  } = useDispatch<Dispatch>();
  const router = useRouter();

  const getTextValue = (value: boolean): string => (value ? 'true' : 'false');

  const setPreload = (value: string): void => {
    if (getTextValue(preload) !== value) {
      togglePreload();
    }
  };

  const options = [
    {value: 'true', text: getI18nText(SETTINGS_I18N_TEXT, 'YES', router)},
    {value: 'false', text: getI18nText(SETTINGS_I18N_TEXT, 'NO', router)},
  ];

  return (
    <BaseSettings
      title={getI18nText(SETTINGS_I18N_TEXT, 'PRELOAD_NEXT_CHAPTER', router)}
      currentValue={getTextValue(preload)}
      setValue={setPreload}
      options={options}
      name='preload-next-chapter'
    />
  );
};
