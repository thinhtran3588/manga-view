import immerPlugin from '@rematch/immer';
import persistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';
import {init, RematchDispatch, RematchRootState} from '@rematch/core';
import {models, RootModel} from './models';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings'], // only those ones will be persisted
};

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin(), persistPlugin(persistConfig)],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
