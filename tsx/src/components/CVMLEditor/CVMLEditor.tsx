/* eslint-disable react/jsx-no-bind */
import './CVMLEditor.css';

import React, { useContext } from 'react';

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

  const present = useContext(PresenterContext);
  const dispatch = useContext(DispatchContext);
  if (!(present && dispatch)) throw 'Trying to render MainMenu without context';
  const { history } = present;

  const currentYAML = ResumeHistory.getCurrent(history);
  /*
  YAML text is dozen+ kB. There is not a lot to be gained from
  it being either state or ref updated on textarea change, but it
  does cost a hook update weighing dozen+ kB.
  */
  const editArea = () => document.getElementsByTagName('textarea')[0];
  const apply = () => {
    const editedYAML = editArea().value;
    if (editedYAML == currentYAML) return alert('No change to apply');
    const update: HistoryChange = {
      type: 'update',
      newContent: editedYAML
    };
    dispatch(update);
    closeEditor();
  };
  const cancel = () => closeEditor();
  const restore = () => {
    editArea().value = currentYAML;
  };

  return (
    <div className='yaml-editor'>
      <div>
        <button onClick={apply} type="button">Apply</button>
        <button onClick={cancel} type="button">Cancel</button>
        <button onClick={restore} type="button">Restore</button>
      </div>
      <textarea defaultValue={currentYAML}/>
    </div>
  );
}
