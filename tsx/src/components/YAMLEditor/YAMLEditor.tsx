/* eslint-disable react/jsx-no-bind */
import './YAMLEditor.css';

import React from 'react';

import {
  YAMLHistory,
  YAMLHistoryChange,
  YAMLHistoryData
} from '../../data/YAMLHistory';

export type YAMLEditorProps = {
  closeEditor: () => void,
  yamlHistory: YAMLHistoryData,
  yamlDispatch: React.Dispatch<YAMLHistoryChange>
};

export function YAMLEditor(props: YAMLEditorProps) {
  const { 
    closeEditor,
    yamlHistory,
    yamlDispatch
  } = props;

  const currentYAML = YAMLHistory.getCurrent(yamlHistory);
  /*
  YAML text is dozen+ kB. There is not a lot to be gained from
  it being either state or ref updated on textarea change, but it
  does cost a hook update weighing dozen+ kB.
  */
  const editArea = () => document.getElementsByTagName('textarea')[0];
  const apply = () => {
    const editedYAML = editArea().value;
    if (editedYAML == currentYAML) return alert('No change to apply');
    const update: YAMLHistoryChange = {
      type: 'update',
      newContent: editedYAML
    };
    yamlDispatch(update);
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
