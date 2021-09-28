import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '@store';
import {LocaleSettings} from './locale-settings';

export const LocaleSettingsContainer = (): JSX.Element => {
  const currentLocale = useSelector((state: RootState) => state.settings.locale);
  const {
    settings: {setLocale},
  } = useDispatch<Dispatch>();

  return <LocaleSettings currentLocale={currentLocale} setLocale={setLocale} />;
};
