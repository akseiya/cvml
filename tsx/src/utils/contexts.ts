import { createContext } from 'react';

import { YAMLHistoryObject } from './sharedTypes';

export const emptyYAMLHistory: YAMLHistoryObject = {
  current: -1,
  versions: []
};

export const yamlHistory = createContext(emptyYAMLHistory);
