import { createContext } from 'react';

import { YAMLHistory } from '../data/YAMLHistory';

export const crateYAMLHistoryContext = createContext(YAMLHistory.createEmpty());
