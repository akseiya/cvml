import React, { useContext } from 'react';

import { ResumeHistory } from '../../data';
import { PresenterContext } from '../../utils/contexts';
import { Career, CVHeader, PanelSet } from '.';

export function CVMLPresenter() {
  const presenterData = useContext(PresenterContext);
  if (!presenterData) throw 'CVMLPresenter shouldn\'t be rendered with empty history!';
  const { history, flags: { flatView } } = presenterData;

  const currentResume = ResumeHistory.parseCurrent(history);

  document.title = `Editable Resume: ${currentResume.name}`;

  return <div className={'resume-root' + (flatView ? '' : ' rich')}>
    <CVHeader currentResume={currentResume}/>
    <main id="long-content">
      <PanelSet
        anchor='summary'
        panelsData={currentResume.summary}
        title='Summary' />

      <a id="career" />
      <Career />

      <PanelSet
        anchor='projects'
        panelsData={currentResume.projects}
        title='Key projects' />
      <PanelSet
        anchor='extras'
        panelsData={currentResume.extras}
        title='Additional information' />
    </main>
  </div>;
};
