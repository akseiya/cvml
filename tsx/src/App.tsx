/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
// eslint-disable-next-line simple-import-sort/imports
import 'animate.css';
import './App.css';
import './App.mainblocks.css';

import React, { useEffect, useState, useReducer } from 'react';

import Career from './Career';
import CVHeader from './CVHeader';
import { MainMenu, YAMLEditor } from './components';
import { renderSummaryItem } from './Summary';
import { resume } from './utils/resume';

import './Responsive.css';
import { updateYAMLHistory } from './utils/reducers';
import { emptyYAMLHistory } from './utils/contexts';

const nonReducedEmptyYamlHistory: string[] = [];

export default function App() {
  const [yamlHistory, yamlDispatch] = useReducer(
    updateYAMLHistory,
    emptyYAMLHistory
  );

  const [currentResume, setCurrentResume] = resume.useState();

  const [layoutIsFlat, setLayoutIsFlat] = useState(false);
  const [editorIsActive, setEditorIsActive] = useState(false);
  const [burgerWasClicked, setBurgerWasClicked] = useState(true);
  const [nrYAMLHistory, setNrYAMLHistory] = useState(nonReducedEmptyYamlHistory);

  const flipFlatLayout = () => { setLayoutIsFlat(!layoutIsFlat); };
  const closeEditor = () => { setEditorIsActive(false); };
  const openEditor = () => { setEditorIsActive(true); };

  const applyYAML = (YAML: string) => {
    if (!YAML) return; // to avoid the destructive "Undo"
    setNrYAMLHistory([...nrYAMLHistory, currentResume.source]);
    resume.loadData(YAML, setCurrentResume);
  };

  const undoYAMLChange = nrYAMLHistory.length ? () => {
    const newYamlHistory = [...nrYAMLHistory];
    applyYAML(newYamlHistory.pop() as string);
    setNrYAMLHistory(newYamlHistory);
  } : false;

  useEffect(() => {
    resume.loadStaticDefault(setCurrentResume);

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  if(!currentResume.career) return (<div/>);
  document.title = `Editable Resume: ${currentResume.name}`;

  if(editorIsActive) return (
    <YAMLEditor {...{
      currentResume,
      applyYAML,
      closeEditor,
      yamlHistory,
      yamlDispatch
    }}/>
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
        openEditor,
        burgerWasClicked,
        setBurgerWasClicked
      }}/>
    </>
  );
}
