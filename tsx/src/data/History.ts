import { jcon } from '../utils/debug';

export type HistoryData = {
  current: number;
  versions: string[];
};

export type HistoryChangeType = 'update' | 'undo' | 'redo' | 'load-default';
export type HistoryChange = {
  type: HistoryChangeType,
  newContent?: string;
}

const undo = (
  history: HistoryData,
): HistoryData => {
  let { current } = history;
  if (current < 1) throw 'No more undos, why button drawn?';
  current--;
  return {
    ...history,
    current
  };
};

const redo = (
  history: HistoryData,
): HistoryData => {
  let { current } = history;
  current++;
  if (current + 1 > history.versions.length) throw 'No more redos, why button drawn?';
  return {
    ...history,
    current
  };
};

const update = (
  history: HistoryData,
  newContent?: string
): HistoryData => {
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
): HistoryData => ({
  current: 0,
  versions: [newContent]
});

export const report = (history: HistoryData) =>
  jcon({
    current: history.current,
    versions: history.versions.map(s => s.slice(0,40))
  });

export const History = {
  report,
  undo,
  redo,
  update,
  setToSingleVersion,
  createEmpty: (): HistoryData => ({
    current: -1,
    versions: []
  }),
  getCurrent: (history: HistoryData): string =>
    history.versions[history.current],
  canRedo: (history: HistoryData): boolean =>
    history.current + 1 < history.versions.length
};
