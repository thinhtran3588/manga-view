import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '@store';
import {ThemeSettings} from './theme-settings';

export const ThemeSettingsContainer = (): JSX.Element => {
  const currentTheme = useSelector((state: RootState) => state.settings.theme);
  const {
    settings: {setTheme},
  } = useDispatch<Dispatch>();

  return <ThemeSettings currentTheme={currentTheme} setTheme={setTheme} />;
};
