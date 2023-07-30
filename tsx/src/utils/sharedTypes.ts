export interface LinkableName {
  name: string;
  link?: string;
}

export type YAMLHistoryObject = {
  current: number;
  versions: string[];
}

type YAMLHistoryChangeType = 'update' | 'undo';
export type YAMLHistoryChange = {
  type: YAMLHistoryChangeType,
  newContent?: string;
}