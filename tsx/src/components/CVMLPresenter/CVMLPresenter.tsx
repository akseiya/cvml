/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Resume } from '../../data/resume';
import { Career, CVHeader, renderSummaryItem } from '.';

export function CVMLPresenter(props: {
  currentResume: Resume,
  layoutIsFlat: boolean
}) {
  const {currentResume, layoutIsFlat} = props;

  document.title = `Editable Resume: ${currentResume.name}`;

  return <div className={'resume-root' + (layoutIsFlat ? '' : ' rich')}>
    <CVHeader currentResume={currentResume}/>
    <main>
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
