import './App.css';

import React, { useEffect } from 'react';

import CVHeader from './CVHeader';
import { resume } from './Resume';
import { jdmp } from './utils/debug';

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
        <pre>{jdmp(currentResume)}</pre>
      </main>
      <footer>Some footer.</footer>
    </div>
  );
}
