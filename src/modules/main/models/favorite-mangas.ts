import {createModel} from '@rematch/core';
import type {Manga} from '@main/interfaces';

export interface FavoriteMangasState {
  mangas: {[id: string]: Manga};
  ids: string[];
}

export const favoriteMangas = createModel()({
  state: {
    mangas: {},
    ids: [],
  } as FavoriteMangasState,
  reducers: {
    addFavoriteManga(draftState, manga: Manga) {
      if (!draftState.ids) {
        draftState.ids = [];
      }
      if (!draftState.ids.includes(manga.id)) {
        draftState.mangas[manga.id] = manga;
        draftState.ids = [manga.id, ...draftState.ids];
      }
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
