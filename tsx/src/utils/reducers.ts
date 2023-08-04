import {
  History,
  HistoryChange,  HistoryData} from '../data/History';

export const updateYAMLHistory = (
  history: HistoryData,
  action: HistoryChange
): HistoryData => {
  switch(action.type) {
  case 'undo':   return History.undo(history);
  case 'redo':   return History.redo(history);
  case 'update': return History.update(history, action.newContent);
  // 'update' dispatch cannot be used, as it adds a new version to the list
  // which leads to double addition in Strict mode dev server!
  case 'load-default': return History.setToSingleVersion(action.newContent);
  default:
    throw `Invalid YAML history action: ${action.type}`;
  }
};
