/* eslint-disable react/jsx-no-bind */
import './App.css';
import './App.mainblocks.css';

import React, {  useEffect, useState } from 'react';

import {  jdmp } from '././utils/debug';
import Career from './Career';
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

  const switchText = flatLayout ? '🟢 restore rich layout' : '⛔ flatten layout';

  return (
    <div className={'resume-root'  + (flatLayout ? '' : ' rich')}>
      <CVHeader currentResume={currentResume} />
      <main>
        <Summary currentResume={currentResume}/>
        <a id="career" />
        <Career currentResume={currentResume}/>
        <pre>{jdmp(currentResume)}</pre>
      </main>
      <footer>
        <a href="#career">Career</a>
      </footer>
      <a className="switchbox" onClick={flipLayout}>{switchText}</a>
    </div>
  );
}
