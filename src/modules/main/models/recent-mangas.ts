import {createModel} from '@rematch/core';
import type {Manga} from '@main/interfaces';

const MAX_RECENT_MANGA_COUNT = 6;

export interface RecentMangasState {
  mangas: {[id: string]: Manga};
  ids: string[];
  currentChapters: {[mangaId: string]: string};
}

const state: RecentMangasState = {
  mangas: {},
  ids: [],
  currentChapters: {},
};

const addRecentManga = (
  draftState: RecentMangasState,
  payload: {manga: Manga; chapterId: string},
): RecentMangasState => {
  const {manga, chapterId} = payload;
  if (!draftState.ids) {
    draftState.ids = [];
  }
  draftState.mangas[manga.id] = manga;
  draftState.ids = [manga.id, ...draftState.ids.filter((id) => id !== manga.id)].slice(0, MAX_RECENT_MANGA_COUNT);
  if (!draftState.currentChapters) {
    draftState.currentChapters = {};
  }
  draftState.currentChapters[manga.id] = chapterId;
  return draftState;
};

export const recentMangas = createModel()({
  state,
  reducers: {
    addRecentManga,
  },
  effects: (_dispatch) => ({}),
});
