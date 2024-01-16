import { useCallback } from 'react';

export const nullCallback = () => useCallback(() => null, []);
