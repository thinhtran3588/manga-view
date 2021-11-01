import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Dispatch, RootState} from '@store';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import CONSTANTS from '@core/constants.json';
import {BaseSettings} from './base-settings';

const {LOCALES} = CONSTANTS;

export const LocaleSettingsContainer = (): JSX.Element => {
  const currentLocale = useSelector((state: RootState) => state.settings.locale);
  const {
    settings: {setLocale},
  } = useDispatch<Dispatch>();
  const router = useRouter();

  return (
    <BaseSettings
      title={getI18nText(SETTINGS_I18N_TEXT, 'LANGUAGE', router)}
      currentValue={currentLocale}
      setValue={setLocale}
      options={LOCALES}
      name='language'
    />
  );
};
