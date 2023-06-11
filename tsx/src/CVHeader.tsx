import './CVHeader.css';

import React from 'react';

import { resume, YAMLResume } from './utils/Resume';

export default function CVHeader(props: { currentResume: YAMLResume }) {
  const { currentResume } = props;
  if (!currentResume.name) {
    return <header />;
  }
  const core = currentResume.fundamentals;
  type CoreLine = [string, string | string[]];
  const coreLine = (pair: CoreLine) => {
    const [key, value] = pair;
    return (
      <tr>
        <th>{key}:</th>
        <td>{Array.isArray(value) ? value.join(', ') : value}</td>
      </tr>
    );
  };
  const coreTable = Object.entries(core).map(coreLine);
  return (
    <header>
      <div style={resume.photoAsBackground(currentResume)}>&nbsp;</div>
      <div>
        <header>{currentResume.name}</header>
        <table>
          <tbody>{coreTable}</tbody>
        </table>
      </div>
    </header>
  );
}
