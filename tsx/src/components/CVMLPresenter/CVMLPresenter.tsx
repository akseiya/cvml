/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';

import { History } from '../../data';
import { HistoryContext } from '../../utils/contexts';
import { Career, CVHeader, renderSummaryItem } from '.';

export function CVMLPresenter(props: {
  layoutIsFlat: boolean
}) {
  const { layoutIsFlat } = props;
  const history = useContext(HistoryContext);
  if (!history) throw 'CVMLPresenter shouldn\'t be rendered with empty history!';
  const currentResume = History.parseCurrent(history);

  document.title = `Editable Resume: ${currentResume.name}`;

  return <div className={'resume-root' + (layoutIsFlat ? '' : ' rich')}>
    <CVHeader currentResume={currentResume}/>
    <main id="long-content">
      <a id="summary"/>
      <h1>Summary</h1>
      {(currentResume.summary ?? []).map(renderSummaryItem)}

      <a id="career" />
      <Career {...{currentResume, layoutIsFlat}} />

      <a id="projects" />
      <h1>Key projects</h1>
      {(currentResume.projects ?? []).map(renderSummaryItem)}

      <a id="extras" />
      <h1>Additional information</h1>
      {(currentResume.extras ?? []).map(renderSummaryItem)}
    </main>
  </div>;
};
