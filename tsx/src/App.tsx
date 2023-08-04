/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import 'animate.css';
import './App.css';
import './App.mainblocks.css';
import './Responsive.css';

import React, { useEffect, useReducer,useState } from 'react';
import YAML from 'yaml';

import { CVMLEditor, CVMLPresenter, MainMenu } from './components';
import { History } from './data/History';
import { Resume } from './data/resume';
import { httpClient } from './utils/client';
import { updateYAMLHistory } from './utils/reducers';
export default function App() {
  const [history, yamlDispatch] = useReducer(
    updateYAMLHistory,
    History.createEmpty()
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
    // development server renders all components twice, which can
    // lead to a pointless http call (this does not prevent it, just
    // allows avoiding it )
    if (history.current > -1) return unMountCallback;
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
    <CVMLEditor {...{
      closeEditor,
      yamlHistory: history,
      yamlDispatch
    }}/>
  );

  const currentYAML = History.getCurrent(history);
  const currentResume: Resume = YAML.parse(currentYAML);

  return (
    <>
      <CVMLPresenter {...{currentResume, layoutIsFlat}}/>
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
