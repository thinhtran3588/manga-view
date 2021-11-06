import {createModel} from '@rematch/core';

export interface MangaSourceState {
  source: string;
}

export const mangaSource = createModel()({
  state: {
    source: '1',
  } as MangaSourceState,
  reducers: {
    changeMangaSource(draftState, payload: string) {
      draftState.source = payload;
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
