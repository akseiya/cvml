/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';

import { ResumeHistory } from '../../data';
import { PresenterContext } from '../../utils/contexts';
import { Career, CVHeader, renderSummaryItem } from '.';

export function CVMLPresenter() {
  const present = useContext(PresenterContext);
  if (!present) throw 'CVMLPresenter shouldn\'t be rendered with empty history!';
  const { history, flags: { flatView } } = present;

  const currentResume = ResumeHistory.parseCurrent(history);

  document.title = `Editable Resume: ${currentResume.name}`;

  return <div className={'resume-root' + (flatView ? '' : ' rich')}>
    <CVHeader currentResume={currentResume}/>
    <main id="long-content">
      <a id="summary"/>
      <h1>Summary</h1>
      {(currentResume.summary ?? []).map(renderSummaryItem)}

      <a id="career" />
      {/* FIXME: Use the context! */}
      <Career {...{currentResume, layoutIsFlat: flatView}} />

      <a id="projects" />
      <h1>Key projects</h1>
      {(currentResume.projects ?? []).map(renderSummaryItem)}

      <a id="extras" />
      <h1>Additional information</h1>
      {(currentResume.extras ?? []).map(renderSummaryItem)}
    </main>
  </div>;
};
