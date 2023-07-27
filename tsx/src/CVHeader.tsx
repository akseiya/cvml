import './CVHeader.css';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import { resume, YAMLResume } from './utils/Resume';
import { SVG } from './utils/svg';

const email = (email: string) =>
  <a href={`mailto:${email}`} id='mail-me'>
    {SVG.envelope}
  </a>;

// eslint-disable-next-line react/no-unused-prop-types
export default function CVHeader(props: { currentResume: YAMLResume }) {
  const { currentResume } = props;

  const navLink = (href:string, label:string) =>
    <span key={`navbar-${href}`}>
      <a href={`#${href}`}>{label}</a>
    </span>;
  const navBar = () => {
    const sections =  [
      ['summary', 'Summary'],
      ['career', 'Career'],
      ['projects', 'Key projects'],
      ['extras', 'Additional info']
    ].map(nbi => navLink(nbi[0],nbi[1]));
    return sections;
  };

  const core = currentResume.fundamentals;
  type CoreLine = [string, string];
  const coreLine = (pair: CoreLine) => {
    const [key, value] = pair;
    return (
      <tr key={key}>
        <th>{`${key}:`}</th>
        <td><ReactMarkdown>{value}</ReactMarkdown></td>
      </tr>
    );
  };
  const coreTable = Object.entries(core).map(coreLine);
  return (
    <header>
      <div>
        <main>
          <header>
            <div
              className='photo'
              style={resume.photoAsBackground(currentResume)}>&nbsp;</div>
          </header>
          <main>
            <header>
              <h1>{currentResume.name}</h1>
            </header>
            <div>
              <table>
                <tbody>{coreTable}</tbody>
              </table>
            </div>
          </main>
        </main>
        <footer className='navbar'>{navBar()}</footer>
      </div>
      { currentResume.email ? email(currentResume.email) : null }
    </header>
  );
}
