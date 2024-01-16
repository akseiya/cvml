import {
  HistoryChange,
  HistoryChangeType,
  ResumeHistory
} from '../data/History';
import { PresenterContext } from './contexts';
import { jdbg } from './debug';

export type FlagSwitchType = 'flatten' | 'unflatten';
export type ActionType = HistoryChangeType | FlagSwitchType;
export type FlagSwitch = {
  type: ActionType;
}

export type Action = HistoryChange | FlagSwitch;

const debugDispatch = (
  presenterData: PresenterContext,
  action: Action) => {
  const { type } = action;
  const { history: { versions, current } } = presenterData;
  jdbg({
    type,
    history: {
      current,
      versions: versions.map(
        v => v.
          split('\n').
          filter(l => !l.startsWith('#') && l.length).
          slice(0,5).
          join(' --- ')
      )
    }
  });
};

export const updatePresenter = (
  presenterData: PresenterContext,
  action: Action
): PresenterContext => {
  const { flags, history } = presenterData;

  debugDispatch(presenterData, action);

  const updateHistory = () =>
    ResumeHistory.update(history, (action as HistoryChange).newContent);
  const initHistory = () =>
    ResumeHistory.initialiseWith((action as HistoryChange).newContent);

  switch(action.type) {
  case 'undo':   return { flags, history: ResumeHistory.undo(history)};
  case 'redo':   return { flags, history: ResumeHistory.redo(history) };
  case 'update': return { flags, history: updateHistory() };
  // 'update' dispatch cannot be used, as it adds a new version to the list
  // which leads to double addition in Strict mode dev server!
  case 'load-default': return { flags, history: initHistory() };
  case 'undo-broken-yaml':
    return { flags, history: ResumeHistory.revertBrokenUpdate(history)};
  case 'discard-broken-yaml':
    return { flags, history: ResumeHistory.discardBrokenUpdate(history)};

  case 'flatten':   return { history, flags: { ...flags, flatView: true } };
  case 'unflatten': return { history, flags: { ...flags, flatView: false } };
  }
};
