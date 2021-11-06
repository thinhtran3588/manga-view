import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Dispatch, RootState} from '@store';
import CONSTANTS from '@core/constants.json';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import {BaseSettings} from './base-settings';

const {SOURCES} = CONSTANTS;

export const SourceSettingsContainer = (): JSX.Element => {
  const source = useSelector((state: RootState) => state.mangaSource.source);
  const {
    mangaSource: {changeMangaSource},
  } = useDispatch<Dispatch>();
  const router = useRouter();

  return (
    <BaseSettings
      title={getI18nText(SETTINGS_I18N_TEXT, 'SOURCE', router)}
      currentValue={source}
      setValue={changeMangaSource}
      options={SOURCES}
      name='source'
    />
  );
};
