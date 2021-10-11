import {Models} from '@rematch/core';
import {settings} from '@core/models/settings';
import {homeScreen} from '@main/models/home-screen';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
  homeScreen: typeof homeScreen;
}

export const models: RootModel = {settings, homeScreen};
