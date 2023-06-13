import './App.css';

import React, { useEffect } from 'react';

import { jdmp } from '././utils/debug';
import CVHeader from './CVHeader';
import Summary from './Summary';
import { resume } from './utils/Resume';

export default function App() {
  const [currentResume, setCurrentResume] = resume.useState();

  useEffect(() => {
    resume.loadStaticDefault(setCurrentResume);

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <div className="resume-root">
      <CVHeader currentResume={currentResume} />
      <main>
        <Summary currentResume={currentResume}/>
        <pre>{jdmp(currentResume)}</pre>
      </main>
      <footer>Some footer.</footer>
      <div className='switchbox'>⛔</div>
    </div>
  );
}
