/* eslint-disable react/jsx-no-bind */
import './YAMLEditor.css';

import { formToJSON } from 'axios';
import React, { useState } from 'react';

import { YAMLResume } from '../../utils/resume';
import { YAMLHistoryChange, YAMLHistoryObject } from '../../utils/sharedTypes';

export type YAMLEditorProps = {
  currentResume: YAMLResume,
  applyYAML: (YAML: string) => void,
  closeEditor: () => void,
  yamlHistory: YAMLHistoryObject,
  yamlDispatch: React.Dispatch<YAMLHistoryChange>
};

export function YAMLEditor(props: YAMLEditorProps) {
  const { 
    currentResume,
    applyYAML,
    closeEditor,
    yamlHistory,
    yamlDispatch
  } = props;

  const currentYAML = yamlHistory.versions[yamlHistory.current];

  /*
  YAML text is dozen+ kB. There is not a lot to be gained from
  it being either state or ref updated on textarea change, but it
  does cost a hook update weighing dozen+ kB.
  */
  // const [ newYAML, setNewYAML ] = useState(currentYAML);
  const editArea = () => document.getElementsByTagName('textarea')[0];
  const apply = () => {
    const editedYAML = editArea().value;
    if (editedYAML == currentYAML) return alert('No change to apply');
    const update: YAMLHistoryChange = {
      type: 'update',
      newContent: editedYAML
    };
    yamlDispatch(update);

    // FIXME: to be factored out
    applyYAML(editedYAML);

    closeEditor();
  };
  const cancel = () => closeEditor();
  const restore = () => {
    editArea().value = currentResume.source;
  };

  return (
    <div className='yaml-editor'>
      <div>
        <button onClick={apply} type="button">Apply</button>
        <button onClick={cancel} type="button">Cancel</button>
        <button onClick={restore} type="button">Restore</button>
      </div>
      <textarea defaultValue={currentResume.source}/>
    </div>
  );
}
