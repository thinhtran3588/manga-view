import {createModel} from '@rematch/core';

export interface HomeScreenState {
  searchTerm: string;
}

const state: HomeScreenState = {
  searchTerm: '',
};

const setSearchTerm = (draftState: HomeScreenState, searchTerm: string): HomeScreenState => {
  draftState.searchTerm = searchTerm;
  return draftState;
};

export const homeScreen = createModel()({
  state,
  reducers: {
    setSearchTerm,
  },
  effects: (_dispatch) => ({}),
});
