import {createModel} from '@rematch/core';

export interface MangaSourceState {
  source: string;
}

const state: MangaSourceState = {
  source: '4',
};

const changeMangaSource = (draftState: MangaSourceState, source: string): MangaSourceState => {
  draftState.source = source;
  return draftState;
};

export const mangaSource = createModel()({
  state,
  reducers: {
    changeMangaSource,
  },
  effects: (_dispatch) => ({}),
});
