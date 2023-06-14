/* eslint-disable react/jsx-no-bind */
import './App.css';

import React, {  useEffect, useState } from 'react';

import {  jdmp } from '././utils/debug';
import CVHeader from './CVHeader';
import Summary from './Summary';
import { resume } from './utils/Resume';

export default function App() {
  const [currentResume, setCurrentResume] = resume.useState();
  const [flatLayout, setFlatLayout] = useState(false);
  const flipLayout = () => {setFlatLayout(!flatLayout);};

  useEffect(() => {
    resume.loadStaticDefault(setCurrentResume);

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const switchText = flatLayout ? 'restore rich layout' : '⛔ flatten layout';

  return (
    <div className="resume-root">
      <CVHeader currentResume={currentResume} />
      <main className={flatLayout ? '' : 'rich'}>
        <Summary currentResume={currentResume}/>
        <pre>{jdmp(currentResume)}</pre>
      </main>
      <footer>Some footer. {flatLayout.toString()}</footer>
      <a className='switchbox' onClick={flipLayout}>{switchText}</a>
    </div>
  );
}
