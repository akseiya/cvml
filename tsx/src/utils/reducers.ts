import {
  HistoryChange,
  HistoryChangeType,
  ResumeHistory
} from '../data/History';
import { PresenterContext } from './contexts';

export type FlagSwitchType = 'flatten' | 'unflatten';
export type ActionType = HistoryChangeType | FlagSwitchType;
export type FlagSwitch = {
  type: ActionType;
}

export type Action = HistoryChange | FlagSwitch;

export const updatePresenter = (
  present: PresenterContext,
  action: Action
): PresenterContext => {
  const { flags, history } = present;

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
  case 'load-default': return { history: initHistory(), flags };

  case 'flatten':   return { history, flags: { ...flags, flatView: true } };
  case 'unflatten': return { history, flags: { ...flags, flatView: false } };
  }
};
