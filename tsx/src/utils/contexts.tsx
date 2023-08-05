import React, { createContext } from 'react';

import { HistoryChange, HistoryData } from '../data';

// type PresenterContext = {
//   history: HistoryData,
//   flags: {
//     layoutIsFlat: boolean;
//   }
// };

export const HistoryContext =
  createContext<HistoryData | null>(null);

export const DispatchContext =
  createContext<React.Dispatch<HistoryChange> | null>(null);

export function HistoryProvider() {
  return (
    <HistoryContext.Provider value={null}>
      <DispatchContext.Provider value={null}>
        goose
      </DispatchContext.Provider>
    </HistoryContext.Provider>
  );
};
