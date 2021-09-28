import React, {FC, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '@store';

const AllTheProviders: FC = ({children}) => <Provider store={store}>{children}</Provider>;

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): ReturnType<typeof render> =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export {customRender as render};
