import {useRouter} from 'next/router';
import {getI18nText} from '@core/helpers/get-i18n-text';
import SETTINGS_I18N_TEXT from '@locales/settings.json';
import {LOCALES} from '@core/constants';
import type {ChangeEvent} from 'react';

export interface LocaleSettingsProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
}

export const LocaleSettings = (props: LocaleSettingsProps): JSX.Element => {
  const {currentLocale, setLocale} = props;
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newLocale = e.target.value;
    setLocale(newLocale);
  };

  return (
    <div className='mt-2'>
      <span className='text-xl font-semibold'>{getI18nText(SETTINGS_I18N_TEXT, 'LANGUAGE', router)}</span>
      <div className='mt-2'>
        {LOCALES.map((locale) => (
          <label
            className='inline-flex items-center mt-2 mr-4 w-full h-10 sm:w-28'
            key={locale.code}
            htmlFor={`rd-${locale.code}`}
          >
            <input
              id={`rd-${locale.code}`}
              type='radio'
              className='form-radio'
              name='language'
              value={locale.code}
              checked={currentLocale === locale.code}
              onChange={onChange}
            />
            <span className='ml-2'>{locale.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
