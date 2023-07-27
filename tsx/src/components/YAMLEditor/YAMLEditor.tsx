/* eslint-disable react/jsx-no-bind */
import './YAMLEditor.css';

import React from 'react';

import { YAMLResume } from '../../utils/Resume';

export type YAMLEditorProps = {
  currentResume: YAMLResume,
  applyYAML: (YAML: string) => void,
  setEditorActive: React.Dispatch<React.SetStateAction<boolean>>
};

export default function YAMLEditor(props: YAMLEditorProps) {
  const { 
    currentResume,
    applyYAML,
    setEditorActive
  } = props;

  const editArea = () => document.getElementsByTagName('textarea')[0];
  const editedYAML = () => editArea().value;
  const apply = () => {
    applyYAML(editedYAML());
    setEditorActive(false);
  };
  const cancel = () => setEditorActive(false);
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
