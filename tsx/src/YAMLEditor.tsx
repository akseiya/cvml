/* eslint-disable react/jsx-no-bind */
import './YAMLEditor.css';

import React from 'react';

import { YAMLResume } from './utils/Resume';

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
  const applyAndExit = () => {
    const newYAML = document.getElementsByTagName('textarea')[0].value;
    applyYAML(newYAML);
    setEditorActive(false);
  };
  return (
    <div className='yaml-editor'>
      <textarea defaultValue={currentResume.source}/>
      <button onClick={applyAndExit} type="button">Apply</button>
    </div>
  );
}
