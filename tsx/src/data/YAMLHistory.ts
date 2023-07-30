import { jcon } from '../utils/debug';

export type YAMLHistoryData = {
  current: number;
  versions: string[];
};

export type YAMLHistoryChangeType = 'update' | 'undo' | 'redo' | 'load-default';
export type YAMLHistoryChange = {
  type: YAMLHistoryChangeType,
  newContent?: string;
}

const undo = (
  history: YAMLHistoryData,
): YAMLHistoryData => {
  let { current } = history;
  if (current < 1) throw 'No more undos, why button drawn?';
  current--;
  return {
    ...history,
    current
  };
};

const redo = (
  history: YAMLHistoryData,
): YAMLHistoryData => {
  let { current } = history;
  current++;
  if (current + 1 > history.versions.length) throw 'No more redos, why button drawn?';
  return {
    ...history,
    current
  };
};

const update = (
  history: YAMLHistoryData,
  newContent?: string
): YAMLHistoryData => {
  if(!newContent) throw 'No new content to update history with';
  
  const { versions, current } = history;
  const cutUndos = versions.slice(0, current + 1);

  return {
    versions: [...cutUndos, newContent],
    current: current + 1
  };
};

const setToSingleVersion = (
  newContent = 'BORKED DISPATCH.'
): YAMLHistoryData => ({
  current: 0,
  versions: [newContent]
});

export const report = (history: YAMLHistoryData) =>
  jcon({
    current: history.current,
    versions: history.versions.map(s => s.slice(0,40))
  });

export const YAMLHistory = {
  report,
  undo,
  redo,
  update,
  setToSingleVersion,
  createEmpty: (): YAMLHistoryData => ({
    current: -1,
    versions: []
  }),
  getCurrent: (history: YAMLHistoryData): string =>
    history.versions[history.current],
  canRedo: (history: YAMLHistoryData): boolean =>
    history.current + 1 < history.versions.length
};
