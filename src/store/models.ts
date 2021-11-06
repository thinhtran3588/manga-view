import {Models} from '@rematch/core';
import {settings} from '@core/models/settings';
import {homeScreen} from '@main/models/home-screen';
import {favoriteMangas} from '@main/models/favorite-mangas';
import {recentMangas} from '@main/models/recent-mangas';
import {nextChapter} from '@main/models/next-chapter';
import {viewMode} from '@main/models/view-mode';
import {mangaSource} from '@main/models/manga-source';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
  homeScreen: typeof homeScreen;
  favoriteMangas: typeof favoriteMangas;
  recentMangas: typeof recentMangas;
  nextChapter: typeof nextChapter;
  viewMode: typeof viewMode;
  mangaSource: typeof mangaSource;
}

export const models: RootModel = {
  settings,
  homeScreen,
  favoriteMangas,
  recentMangas,
  nextChapter,
  viewMode,
  mangaSource,
};
