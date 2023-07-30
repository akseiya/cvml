import React from 'react';

import { YAMLHistoryData } from '../../data/YAMLHistory';
import { jcon } from '../../utils/debug';

export default function YAMLPresenter(props: { history: YAMLHistoryData }) {
  const {history} = props;
  jcon({history});
  return <div>Presenter</div>;
};
