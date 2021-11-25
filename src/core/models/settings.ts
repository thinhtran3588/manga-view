import type {Theme} from '@core/interfaces';
import {createModel} from '@rematch/core';

export interface SettingsState {
  locale: string;
  theme: Theme;
}

const state: SettingsState = {
  locale: 'en',
  theme: '',
};

const setLocale = (draftState: SettingsState, locale: string): SettingsState => {
  draftState.locale = locale;
  return draftState;
};

const setTheme = (draftState: SettingsState, theme: Theme): SettingsState => {
  draftState.theme = theme;
  return draftState;
};

export const settings = createModel()({
  state,
  reducers: {
    setLocale,
    setTheme,
  },
  effects: (_dispatch) => ({}),
});
