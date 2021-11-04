import {createModel} from '@rematch/core';

export interface ViewModeState {
  mode: string;
}

export const viewMode = createModel()({
  state: {
    mode: '0',
  } as ViewModeState,
  reducers: {
    changeViewMode(draftState, payload: string) {
      draftState.mode = payload;
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
