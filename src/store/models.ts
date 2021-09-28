import {Models} from '@rematch/core';
import {settings} from '@core/models/settings';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
}

export const models: RootModel = {settings};
