import {
  YAMLHistory,
  YAMLHistoryChange,
  YAMLHistoryData
} from '../data/YAMLHistory';

export const updateYAMLHistory = (
  history: YAMLHistoryData,
  action: YAMLHistoryChange
): YAMLHistoryData => {
  switch(action.type) {
  case 'undo':   return YAMLHistory.undo(history);
  case 'redo':   return YAMLHistory.redo(history);
  case 'update': return YAMLHistory.update(history, action.newContent);
  // 'update' dispatch cannot be used, as it adds a new version to the list
  // which leads to double addition in Strict mode dev server!
  case 'load-default': return YAMLHistory.setToSingleVersion(action.newContent);
  default:
    throw `Invalid YAML history action: ${action.type}`;
  }
};
