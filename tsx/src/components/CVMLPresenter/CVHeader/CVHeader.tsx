import './CVHeader.css';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import { photoAsBackground ,Resume } from '../../../data/resume';
import { SVG } from '../../../utils/svg';

const email = (email: string) =>
  <a href={`mailto:${email}`} id='mail-me'>
    {SVG.envelope}
  </a>;

export function CVHeader(props: { readonly currentResume: Resume }) {
  const { currentResume } = props;

  const navLink = (href:string, label:string) =>
    <span key={`navbar-${href}`}>
      <a href={`#${href}`}>{label}</a>
    </span>;
  const navBar = () => {
    const sections =  [
      ['summary', 'Summary'],
      ['career', 'Career'],
      ['projects', 'Projects'],
      ['extras', 'Bits & bobs']
    ].filter(s => s[0] in currentResume).
      map(nbi => navLink(nbi[0],nbi[1]));
    return sections;
  };

  const core = currentResume.fundamentals;
  if (!core)
    throw new Error('Cannot render the header with no `/fundamentals` in YAML');
  type CoreLine = [string, string];
  const coreLine = (pair: CoreLine) => {
    const [key, value] = pair.map(e => e.toString());
    return (
      <tr key={key}>
        <th>{`${key}:`}</th>
        <td><ReactMarkdown>{value}</ReactMarkdown></td>
      </tr>
    );
  };

  const coreTable = Object.entries(core).map(coreLine);
  const photoStyle = photoAsBackground(currentResume);

  return (
    <header>
      <div>
        <main>
          <header>
            <div
              className='photo'
              style={photoStyle}>&nbsp;</div>
          </header>
          <main>
            <header>
              <h1>{currentResume.name}</h1>
            </header>
            <div><table><tbody>
              {coreTable}
            </tbody></table></div>
          </main>
        </main>
        <footer className='navbar'>{navBar()}</footer>
      </div>
      { currentResume.email ? email(currentResume.email) : null }
    </header>
  );
}
