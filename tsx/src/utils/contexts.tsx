import React, { createContext } from 'react';

import { HistoryData } from '../data';
import { Action } from './reducers';

export type PresenterContext = {
  history: HistoryData,
  flags: {
    flatView: boolean;
  }
};

export const PresenterContext =
  createContext<PresenterContext | null>(null);

export const DispatchContext =
  createContext<React.Dispatch<Action> | null>(null);

type MainAppContextProps = {
  readonly children: React.ReactNode;
  readonly presenterData: PresenterContext;
  readonly dispatch: React.Dispatch<Action>;
}

export function AppContextProvider(props: MainAppContextProps) {
  const { children, presenterData, dispatch } = props;
  return (
    <PresenterContext.Provider value={presenterData}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </PresenterContext.Provider>
  );
};
