import type {NextRouter} from 'next/router';
import type {I18nText} from '../interfaces';

export const getI18nText = (texts: I18nText, key: string, router: NextRouter): string =>
  texts[(router.locale || router.defaultLocale || 'en').toUpperCase()][key] || key;
