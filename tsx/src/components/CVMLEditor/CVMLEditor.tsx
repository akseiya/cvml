import './CVMLEditor.css';

import React, { useCallback, useContext } from 'react';

import {
  HistoryChange,
  ResumeHistory
} from '../../data/History';
import {
  DispatchContext,
  PresenterContext
} from '../../utils/contexts';

export type YAMLEditorProps = {
  closeEditor: () => void,
};

export function CVMLEditor(props: YAMLEditorProps) {
  const { 
    closeEditor,
  } = props;

  const presenterData = useContext(PresenterContext);
  const dispatch = useContext(DispatchContext);
  if (!(presenterData && dispatch)) throw 'Trying to render MainMenu without context';
  const { history } = presenterData;

  const currentYAML = ResumeHistory.getCurrent(history);
  /*
  YAML text is dozen+ kB. There is not a lot to be gained from
  it being either state or ref updated on textarea change, but it
  does cost a hook update weighing dozen+ kB.
  */
  const editArea = () => document.getElementsByTagName('textarea')[0];
  const apply = useCallback(
    () => {
      const editedYAML = editArea().value;
      if (editedYAML == currentYAML) return alert('No YAML change to apply');
      const update: HistoryChange = {
        type: 'update',
        newContent: editedYAML
      };
      dispatch(update);
      closeEditor();
    }, [dispatch]
  );
  const restore = useCallback(() => {
    editArea().value = currentYAML;
  }, [presenterData]); // though no other component should be able to change it

  return (
    <div className='yaml-editor'>
      <div>
        <button onClick={apply} type="button">Apply</button>
        <button onClick={closeEditor} type="button">Cancel</button>
        <button onClick={restore} type="button">Restore</button>
      </div>
      <textarea defaultValue={currentYAML}/>
    </div>
  );
}
