/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import './App.css';
import './App.mainblocks.css';

import React, { useEffect, useState } from 'react';

import Career from './Career';
import CVHeader from './CVHeader';
import MainMenu from './MainMenu';
import { renderSummaryItem } from './Summary';
import { resume } from './utils/Resume';
import YAMLEditor from './YAMLEditor';

export default function App() {
  const [currentResume, setCurrentResume] = resume.useState();

  const [flatLayout, setFlatLayout] = useState(false);
  const flipFlatLayout = () => {
    setFlatLayout(!flatLayout);
  };
  const [editorActive, setEditorActive] = useState(false);

  const emptyYamlHistory: string[] = [];
  const [yamlHistory, setYamlHistory] = useState(emptyYamlHistory);

  const applyYAML = (YAML: string) => {
    if (!YAML) return; // to avoid the destructive "Undo"
    setYamlHistory([...yamlHistory, currentResume.source]);
    resume.loadData(YAML, setCurrentResume);
  };

  const undoYAMLChange = () => {
    if (!yamlHistory.length) return;
    const newYamlHistory = [...yamlHistory];
    applyYAML(newYamlHistory.pop() as string);
    setYamlHistory(newYamlHistory);
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
        <MainMenu {...{flipFlatLayout}}/>
        {/* <a className="switchbox" onClick={flipLayout}>
          {switchText}
        </a>
        <a className="switchbox" onClick={() => setEditorActive(true)}>
          <b>✎</b> edit YAML
        </a>
        { !yamlHistory.length ? null :
          (<a className="switchbox" onClick={undoYAMLChange}>
            <b>⭯</b> restore YAML
          </a>) } */}
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
