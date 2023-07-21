import './CVHeader.css';

import React from 'react';

import { jcon } from './utils/debug';
import { resume, YAMLResume } from './utils/Resume';

// eslint-disable-next-line react/no-unused-prop-types
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
      <tr key={key}>
        <th>{key}:</th>
        <td>{Array.isArray(value) ? value.join(', ') : value}</td>
      </tr>
    );
  };
  const coreTable = Object.entries(core).map(coreLine);
  jcon(resume.photoAsBackground(currentResume));
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
