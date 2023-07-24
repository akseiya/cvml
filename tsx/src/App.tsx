/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import './App.css';
import './App.mainblocks.css';

import React, { useEffect, useState } from 'react';

import Career from './Career';
import CVHeader from './CVHeader';
import { renderSummaryItem } from './Summary';
import { resume } from './utils/Resume';
import YAMLEditor from './YAMLEditor';

export default function App() {
  const [currentResume, setCurrentResume] = resume.useState();
  const [flatLayout, setFlatLayout] = useState(false);
  const [editorActive, setEditorActive] = useState(false);
  const flipLayout = () => {
    setFlatLayout(!flatLayout);
  };

  const applyYAML = (YAML: string) => {
    resume.loadData(YAML, setCurrentResume);
  };

  useEffect(() => {
    resume.loadStaticDefault(setCurrentResume);

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const switchText = flatLayout
    ? '🟢 restore rich layout'
    : '⛔ flatten layout';

  const navLink = (href:string, label:string) => (<span><a href={`#${href}`}>{label}</a></span>);
  const navBar = () => {
    const sections =  [
      ['summary', 'Summary'],
      ['career', 'Career'],
      ['projects', 'Key projects'],
      ['extras', 'Additional info']
    ].map(nbi => navLink(nbi[0],nbi[1]));
    return (<div className="navbar">{sections}</div>);
  };

  if(!currentResume.career) return (<div/>);
  document.title = `Resume: ${currentResume.name}`;

  if(editorActive) return (
    <YAMLEditor {...{currentResume, applyYAML, setEditorActive}}/>
  );

  return (
    <div className={'resume-root' + (flatLayout ? '' : ' rich')}>
      <div className="pagetop">
        <CVHeader currentResume={currentResume}/>
        {navBar()}
        <a className="switchbox" onClick={flipLayout}>
          {switchText}
        </a>
        <a className="switchbox" onClick={() => setEditorActive(true)}>
        ✎ edit YAML
        </a>
      </div>
      <main>
        <a className='scrolly' id="summary"/>
        <h1>Summary</h1>
        {(currentResume.summary ?? []).map(renderSummaryItem)}

        <a className='scrolly' id="career" />
        <Career currentResume={currentResume} />

        <a className='scrolly' id="projects" />
        <h1>Key projects</h1>
        {(currentResume.projects ?? []).map(renderSummaryItem)}

        <a className='scrolly' id="extras" />
        <h1>Additional information</h1>
        {(currentResume.extras ?? []).map(renderSummaryItem)}
      </main>
    </div>
  );
}
