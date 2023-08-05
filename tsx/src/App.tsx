/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import 'animate.css';
import './App.css';
import './App.mainblocks.css';
import './Responsive.css';

import React, { useEffect, useReducer, useState } from 'react';

import { CVMLEditor, CVMLPresenter, MainMenu } from './components';
import { History } from './data';
import { httpClient } from './utils/client';
import { DispatchContext, HistoryContext } from './utils/contexts';
import { updateHistory } from './utils/reducers';

export default function App() {
  const [history, dispatch] = useReducer(
    updateHistory,
    History.createEmpty()
  );

  const [layoutIsFlat,     setLayoutIsFlat]     = useState(false);
  const [editorIsActive,   setEditorIsActive]   = useState(false);
  const [burgerWasClicked, setBurgerWasClicked] = useState(true);

  const flipFlatLayout = () => { setLayoutIsFlat(!layoutIsFlat); };
  const closeEditor    = () => { setEditorIsActive(false);       };
  const openEditor     = () => { setEditorIsActive(true);        };

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

  let mainContent: JSX.Element;
  if (editorIsActive) {
    mainContent = <CVMLEditor {...{
      closeEditor,
      history,
      dispatch
    }}/>;
  } else {
    /*
    Preventing burger pulse needs to happen in its parent.
    Main menu is not shown at all in the YAML editor.
    Flat layout flag to be put in the context.
    */
    const mainMenuWiring = {
      layoutIsFlat,
      flipFlatLayout,
      openEditor,
      burgerWasClicked,
      setBurgerWasClicked
    };
    mainContent = <>
      <CVMLPresenter {...{layoutIsFlat}}/>
      <MainMenu {...mainMenuWiring } />
    </>;
  }

  return (
    <HistoryContext.Provider value={history}>
      <DispatchContext.Provider value={dispatch}>
        {mainContent}
      </DispatchContext.Provider>
    </HistoryContext.Provider>
  );
}
