import 'animate.css';
import './App.css';
import './App.mainblocks.css';
import './Responsive.css';

import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CVMLEditor, CVMLPresenter, ErrorRecovery, MainMenu } from './components';
import { ResumeHistory } from './data';
import { httpClient } from './utils/client';
import { AppContextProvider } from './utils/contexts';
import { updatePresenter } from './utils/reducers';

export default function App() {
  const [presenterData, dispatch] = useReducer(
    updatePresenter,
    {
      history: ResumeHistory.createEmpty(),
      flags: { flatView: false }
    }
  );
  const { history } = presenterData;

  const [editorIsActive,   setEditorIsActive]   = useState(false);
  const [burgerWasClicked, setBurgerWasClicked] = useState(false);

  const closeEditor = () => { setEditorIsActive(false); };
  const openEditor  = () => { setEditorIsActive(true);  };

  const undoBrokenYAML = useCallback(
    () => {
      dispatch({type: 'undo-broken-yaml'});
      openEditor();
    },
    [dispatch]
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const unMountCallback = () => {};
    // development server renders all components twice, which can
    // lead to a pointless http call (this does not prevent it, just
    // allows avoiding it )
    if (history.current > -1) return unMountCallback;
    if (history.current < 0)
      httpClient.
        getDefaultCV().
        then((defaultYAML) => {
          if (history.current < 0)
            dispatch({
              type: 'load-default',
              newContent: defaultYAML
            });
        });

    return unMountCallback;
  }, []);

  if (history.versions.length < 1) return <div>Loading the default CV...</div>;

  const inContext = (children: React.ReactNode) =>
    <AppContextProvider {...{ presenterData, dispatch }}>
      { children }
    </AppContextProvider>;

  if (editorIsActive) return inContext(
    <CVMLEditor {...{ closeEditor }}/>
  );

  const mainMenuWiring = {
    openEditor,
    burgerWasClicked,
    setBurgerWasClicked
  };

  return inContext(<ErrorBoundary
    FallbackComponent={ErrorRecovery}
    onReset={undoBrokenYAML}
  >
    <CVMLPresenter/>
    <MainMenu {...mainMenuWiring } />
  </ErrorBoundary>);
}
