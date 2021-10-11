import {createModel} from '@rematch/core';

export interface HomeScreenState {
  searchTerm: string;
}

export const homeScreen = createModel()({
  state: {
    searchTerm: '',
  } as HomeScreenState,
  reducers: {
    setLocale(draftState, searchTerm: string) {
      draftState.searchTerm = searchTerm;
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
