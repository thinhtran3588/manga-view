import type {Theme} from '@core/interfaces';
import {createModel} from '@rematch/core';

export interface SettingsState {
  locale: string;
  theme: Theme;
}

export const settings = createModel()({
  state: {
    locale: 'en',
    theme: '',
  } as SettingsState,
  reducers: {
    // handle state changes with pure functions
    setLocale(draftState, locale: string) {
      draftState.locale = locale;
      return draftState;
    },
    setTheme(draftState, theme: Theme) {
      draftState.theme = theme;
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
