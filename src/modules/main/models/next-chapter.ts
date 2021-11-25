import {createModel} from '@rematch/core';

export interface NextChapterState {
  preload: boolean;
}

const state: NextChapterState = {
  preload: false,
};

const togglePreload = (draftState: NextChapterState): NextChapterState => {
  draftState.preload = !draftState.preload;
  return draftState;
};

export const nextChapter = createModel()({
  state,
  reducers: {
    togglePreload,
  },
  effects: (_dispatch) => ({}),
});
