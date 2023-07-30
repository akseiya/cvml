import React from 'react';

import { jcon } from '../utils/debug';
import { YAMLHistoryObject } from '../utils/sharedTypes';

export default function YAMLPresenter(props: { history: YAMLHistoryObject }) {
  const {history} = props;
  jcon({history});
  return <div>Presenter</div>;
};
