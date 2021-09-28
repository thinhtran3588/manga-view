import type {NextPage} from 'next';
import {LocaleSettingsContainer} from './components/locale-settings-container';
import {ThemeSettingsContainer} from './components/theme-settings-container';

export const Settings: NextPage = (): JSX.Element => (
  <div className='flex flex-col w-full'>
    <LocaleSettingsContainer />
    <hr />
    <ThemeSettingsContainer />
  </div>
);
