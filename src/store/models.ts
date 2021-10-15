import {Models} from '@rematch/core';
import {settings} from '@core/models/settings';
import {homeScreen} from '@main/models/home-screen';
import {favoriteMangas} from '@main/models/favorite-mangas';
import {recentMangas} from '@main/models/recent-mangas';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
  homeScreen: typeof homeScreen;
  favoriteMangas: typeof favoriteMangas;
  recentMangas: typeof recentMangas;
}

export const models: RootModel = {settings, homeScreen, favoriteMangas, recentMangas};
