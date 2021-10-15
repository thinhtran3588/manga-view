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
    toggleFavoriteManga(draftState, manga: Manga) {
      if (!draftState.ids) {
        draftState.ids = [];
      }
      if (!draftState.ids.includes(manga.id)) {
        draftState.mangas[manga.id] = manga;
        draftState.ids = [manga.id, ...draftState.ids];
      } else {
        delete draftState.mangas[manga.id];
        draftState.ids = draftState.ids.filter((id) => id !== manga.id);
      }
      return draftState;
    },
  },
  effects: (_dispatch) => ({}),
});
