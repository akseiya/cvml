/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
// eslint-disable-next-line simple-import-sort/imports
import 'animate.css';
import './App.css';
import './App.mainblocks.css';

import React, { useEffect, useState, useReducer } from 'react';
import YAML from 'yaml';

import Career from './Career';
import CVHeader from './CVHeader';
import { MainMenu, YAMLEditor } from './components';
import { renderSummaryItem } from './Summary';
import { YAMLResume } from './utils/resume';
import { updateYAMLHistory } from './utils/reducers';

import './Responsive.css';
import { httpClient } from './http/client';
import { YAMLHistory } from './data/YAMLHistory';

export default function App() {
  const [yamlHistory, yamlDispatch] = useReducer(
    updateYAMLHistory,
    YAMLHistory.createEmpty()
  );

  const [layoutIsFlat, setLayoutIsFlat] = useState(false);
  const [editorIsActive, setEditorIsActive] = useState(false);
  const [burgerWasClicked, setBurgerWasClicked] = useState(true);

  const flipFlatLayout = () => { setLayoutIsFlat(!layoutIsFlat); };
  const closeEditor = () => { setEditorIsActive(false); };
  const openEditor = () => { setEditorIsActive(true); };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const unMountCallback = (() => {});
    // History length check is for development server
    if (yamlHistory.current > -1) return unMountCallback;
    console.log('\n\nUsing Effect\n\n');
    if (yamlHistory.current < 0)
      httpClient.
        getDefaultCV().
        then((defaultYAML) => {
          if (yamlHistory.current < 0)
            yamlDispatch({
              type: 'load-default',
              newContent: defaultYAML.data
            });
        });

    return unMountCallback;
  }, []);  

  // console.log('Rendering app');
  // YAMLHistory.report(yamlHistory);
  if (yamlHistory.versions.length < 1) return <div>Loading the default CV...</div>;
  
  const currentYAML = YAMLHistory.getCurrent(yamlHistory);
  const currentResume: YAMLResume = YAML.parse(currentYAML);
  
  document.title = `Editable Resume: ${currentResume.name}`;

  if(editorIsActive) return (
    <YAMLEditor {...{
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
        yamlHistory,
        yamlDispatch,
        openEditor,
        burgerWasClicked,
        setBurgerWasClicked
      }}/>
    </>
  );
}
