import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Dispatch, RootState} from '@store';
import CONSTANTS from '@core/constants.json';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import {BaseSettings} from './base-settings';

const {THEMES} = CONSTANTS;

export const ThemeSettingsContainer = (): JSX.Element => {
  const currentTheme = useSelector((state: RootState) => state.settings.theme);
  const {
    settings: {setTheme},
  } = useDispatch<Dispatch>();
  const router = useRouter();

  const options = THEMES.map((option) => ({
    value: option.value,
    text: getI18nText(SETTINGS_I18N_TEXT, option.text, router),
  }));

  return (
    <BaseSettings
      title={getI18nText(SETTINGS_I18N_TEXT, 'THEME', router)}
      currentValue={currentTheme}
      setValue={setTheme as (value: string) => void}
      options={options}
      name='theme'
    />
  );
};
