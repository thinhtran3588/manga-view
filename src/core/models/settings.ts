import {createModel} from '@rematch/core';

export interface SettingsState {
  locale: string;
}

export const settings = createModel()({
  state: {
    locale: 'en',
  } as SettingsState,
  reducers: {
    // handle state changes with pure functions
    setLocale(draftState, locale: string) {
      draftState.locale = locale;
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
