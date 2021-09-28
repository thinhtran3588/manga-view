import {useRouter} from 'next/router';
import type {ChangeEvent} from 'react';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import {THEMES} from '@core/constants';
import type {Theme} from '@core/interfaces';

export interface ThemeSettingsProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeSettings = (props: ThemeSettingsProps): JSX.Element => {
  const {currentTheme, setTheme} = props;
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newTheme = e.target.value as Theme;
    setTheme(newTheme);
  };

  return (
    <div className='mt-2'>
      <span className='text-xl font-semibold'>{getI18nText(SETTINGS_I18N_TEXT, 'THEME', router)}</span>
      <div className='mt-2'>
        {THEMES.map((theme) => (
          <label
            className='inline-flex items-center mt-2 h-10 w-full sm:w-1/4 md:w-1/5 lg:w-1/6'
            key={theme.code}
            htmlFor={`rd-${theme.code}`}
          >
            <input
              id={`rd-${theme.code}`}
              type='radio'
              className='form-radio'
              name='theme'
              value={theme.code}
              checked={currentTheme === theme.code}
              onChange={onChange}
            />
            <span className='ml-2'>{getI18nText(SETTINGS_I18N_TEXT, theme.textKey, router)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
