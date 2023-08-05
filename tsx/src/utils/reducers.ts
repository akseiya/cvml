import {
  History,
  HistoryChange,
  HistoryData
} from '../data/History';

export const updateHistory = (
  history: HistoryData,
  action: HistoryChange
): HistoryData => {
  switch(action.type) {
  case 'undo':   return History.undo(history);
  case 'redo':   return History.redo(history);
  case 'update': return History.update(history, action.newContent);
  // 'update' dispatch cannot be used, as it adds a new version to the list
  // which leads to double addition in Strict mode dev server!
  case 'load-default': return History.initialiseWith(action.newContent);
  default:
    throw `Invalid resume history action: ${action.type}`;
  }
};
