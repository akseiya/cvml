/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import 'animate.css';
import './App.css';
import './App.mainblocks.css';
import './Responsive.css';

import React, { useEffect, useReducer,useState } from 'react';
import YAML from 'yaml';

import { MainMenu, YAMLEditor, YAMLPresenter } from './components';
import { YAMLResume } from './data/resume';
import { YAMLHistory } from './data/YAMLHistory';
import { httpClient } from './utils/client';
import { updateYAMLHistory } from './utils/reducers';
export default function App() {
  const [history, yamlDispatch] = useReducer(
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
    if (history.current > -1) return unMountCallback;
    console.log('\n\nUsing Effect\n\n');
    if (history.current < 0)
      httpClient.
        getDefaultCV().
        then((defaultYAML) => {
          if (history.current < 0)
            yamlDispatch({
              type: 'load-default',
              newContent: defaultYAML
            });
        });

    return unMountCallback;
  }, []);

  if (history.versions.length < 1) return <div>Loading the default CV...</div>;

  if(editorIsActive) return (
    <YAMLEditor {...{
      closeEditor,
      yamlHistory: history,
      yamlDispatch
    }}/>
  );

  const currentYAML = YAMLHistory.getCurrent(history);
  const currentResume: YAMLResume = YAML.parse(currentYAML);


  return (
    <>
      <YAMLPresenter {...{currentResume, layoutIsFlat}}/>
      <MainMenu {...{
        layoutIsFlat,
        flipFlatLayout,
        yamlHistory: history,
        yamlDispatch,
        openEditor,
        burgerWasClicked,
        setBurgerWasClicked
      }}/>
    </>
  );
}
