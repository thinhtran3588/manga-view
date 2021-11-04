import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Dispatch, RootState} from '@store';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import CONSTANTS from '@core/constants.json';
import {BaseSettings} from './base-settings';

export const ViewModeSettingsContainer = (): JSX.Element => {
  const mode = useSelector((state: RootState) => state.viewMode.mode);
  const {
    viewMode: {changeViewMode},
  } = useDispatch<Dispatch>();
  const router = useRouter();

  const options = [
    {
      value: CONSTANTS.VIEW_MODE.ALL_IMAGES,
      text: getI18nText(SETTINGS_I18N_TEXT, 'VIEW_MODE_ALL_IMAGES', router),
    },
    {
      value: CONSTANTS.VIEW_MODE.ONE_IMAGE,
      text: getI18nText(SETTINGS_I18N_TEXT, 'VIEW_MODE_ONE_IMAGE', router),
    },
  ];

  return (
    <BaseSettings
      title={getI18nText(SETTINGS_I18N_TEXT, 'VIEW_MODE', router)}
      currentValue={mode}
      setValue={changeViewMode}
      options={options}
      name='view-mode'
    />
  );
};
