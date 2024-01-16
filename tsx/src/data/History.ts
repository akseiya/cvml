import YAML from 'yaml';

import { jcon } from '../utils/debug';
import { Resume } from './resume';

export type HistoryData = {
  current: number;
  versions: string[];
  // History manipulation functions tend to return new history
  // from `current` and `versions` only, so if some new fields are
  // added besides the throwaway `brokenUpdate`, more functionality,
  // similar to separate `discardBrokenUpdate()`, need to be added.
  brokenUpdate?: string;
};

export type HistoryChangeType = 'update' | 'undo' | 'redo' |
                                'load-default' |
                                'undo-broken-yaml' | 'discard-broken-yaml';
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
  if (current + 1 > history.versions.length)
    throw 'No more redos, why button drawn?';
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

const revertBrokenUpdate = (
  history: HistoryData,
): HistoryData => {
  const { versions, current } = history;
  if (current !== versions.length - 1)
    throw 'revertBrokenUpdate() only makes sense after update()';
  const versionsCopy = [...versions];
  const brokenUpdate = versionsCopy.pop();
  return {
    versions: versionsCopy,
    current: current - 1,
    brokenUpdate
  };
};

const discardBrokenUpdate = (
  history: HistoryData,
): HistoryData => {
  const newHistory = { ...history };
  if (newHistory.brokenUpdate) delete newHistory.brokenUpdate;
  return newHistory;
};

const initialiseWith = (
  newContent = 'BORKED DISPATCH.'
): HistoryData => ({
  current: 0,
  versions: [newContent]
});

const report = (history: HistoryData) =>
  jcon({
    current: history.current,
    versions: history.versions.map(s => s.slice(0,40))
  });

const getCurrent = (history: HistoryData): string =>
  history.versions[history.current];

const parseCurrent = (history: HistoryData): Resume =>
  YAML.parse(getCurrent(history));

export const ResumeHistory = {
  report,
  undo,
  redo,
  update,
  revertBrokenUpdate,
  discardBrokenUpdate,
  initialiseWith,
  createEmpty: (): HistoryData => ({
    current: -1,
    versions: []
  }),
  getCurrent,
  parseCurrent,
  canRedo: (history: HistoryData): boolean =>
    history.current + 1 < history.versions.length,
  canUndo: (history: HistoryData): boolean =>
    history.current > 0
};
