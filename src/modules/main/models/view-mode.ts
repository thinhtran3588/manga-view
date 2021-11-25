import {createModel} from '@rematch/core';

export interface ViewModeState {
  mode: string;
}

const state: ViewModeState = {
  mode: '0',
};

const changeViewMode = (draftState: ViewModeState, mode: string): ViewModeState => {
  draftState.mode = mode;
  return draftState;
};

export const viewMode = createModel()({
  state,
  reducers: {
    changeViewMode,
  },
  effects: (_dispatch) => ({}),
});
