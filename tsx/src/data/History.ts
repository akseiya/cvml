import YAML from 'yaml';

import { jcon } from '../utils/debug';
import { Resume } from './resume';

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

export const History = {
  report,
  undo,
  redo,
  update,
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
