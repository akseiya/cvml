import React, { createContext } from 'react';

import {
  // HistoryChange,
  HistoryData
} from '../data';
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
  children: React.ReactNode;
  present: PresenterContext;
  dispatch: React.Dispatch<Action>;
}

export function AppContextProvider(props: MainAppContextProps) {
  const { children, present, dispatch } = props;
  return (
    <PresenterContext.Provider value={present}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </PresenterContext.Provider>
  );
};
