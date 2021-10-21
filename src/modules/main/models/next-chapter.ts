import {createModel} from '@rematch/core';

export interface NextChapterState {
  preload: boolean;
}

export const nextChapter = createModel()({
  state: {
    preload: false,
  } as NextChapterState,
  reducers: {
    togglePreload(draftState) {
      draftState.preload = !draftState.preload;
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
