import { YAMLHistoryChange, YAMLHistoryObject } from './sharedTypes';

const yhUndo = (
  history: YAMLHistoryObject,
) => {
  if (history.current < 1) throw 'No more undos, why button drawn?';
  history.current--;
};

const yhUpdate = (
  history: YAMLHistoryObject,
  newContent: string
) => {
  const { versions, current } = history;
  const cutUndos = versions.slice(0, current + 1);
  history.versions = [...cutUndos, newContent];
  history.current++;
};

export const updateYAMLHistory = (
  history: YAMLHistoryObject,
  action: YAMLHistoryChange
): YAMLHistoryObject => {
  const newHistory = {...history};
  switch(action.type) {
  case 'undo':  yhUndo(newHistory); break;
  case 'update':
    if(!action.newContent) throw 'A YAML update needs to exist';
    yhUpdate(newHistory, action.newContent);
    break;
  default:
    throw `Invalid YAML history action: ${action.type}`;
  }
  return newHistory;
};
