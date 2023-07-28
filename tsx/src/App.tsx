/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
// eslint-disable-next-line simple-import-sort/imports
import 'animate.css';
import './App.css';
import './App.mainblocks.css';

import React, { useEffect, useState } from 'react';

import Career from './Career';
import CVHeader from './CVHeader';
import MainMenu from './components/MainMenu/MainMenu';
import { renderSummaryItem } from './Summary';
import { resume } from './utils/Resume';
import YAMLEditor from './components/YAMLEditor/YAMLEditor';

import './Responsive.css';

const emptyYamlHistory: string[] = [];

export default function App() {
  const [currentResume, setCurrentResume] = resume.useState();

  const [layoutIsFlat, setLayoutIsFlat] = useState(false);
  const flipFlatLayout = () => {
    setLayoutIsFlat(!layoutIsFlat);
  };
  const [editorActive, setEditorActive] = useState(false);

  const [yamlHistory, setYamlHistory] = useState(emptyYamlHistory);

  const applyYAML = (YAML: string) => {
    if (!YAML) return; // to avoid the destructive "Undo"
    setYamlHistory([...yamlHistory, currentResume.source]);
    resume.loadData(YAML, setCurrentResume);
  };

  const undoYAMLChange = yamlHistory.length ? () => {
    const newYamlHistory = [...yamlHistory];
    applyYAML(newYamlHistory.pop() as string);
    setYamlHistory(newYamlHistory);
  } : false;

  useEffect(() => {
    resume.loadStaticDefault(setCurrentResume);

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  if(!currentResume.career) return (<div/>);
  document.title = `Editable Resume: ${currentResume.name}`;

  if(editorActive) return (
    <YAMLEditor {...{currentResume, applyYAML, setEditorActive}}/>
  );

  return (
    <>
      <div className={'resume-root' + (layoutIsFlat ? '' : ' rich')}>
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
      </div>
      <MainMenu {...{
        layoutIsFlat,
        flipFlatLayout,
        undoYAMLChange,
        activateEditor: () => setEditorActive(true)
      }}/>
    </>
  );
}
