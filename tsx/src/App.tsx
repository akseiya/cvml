import './App.css';

import React, { useEffect, useState } from 'react';

import { Resume,resume } from './Resume';
import { jdmp } from './utils/debug';;

export default function App() {
  const [currentResume, setCurrentResume] = useState({} as Resume);

  useEffect(() => {
    resume.loadStaticDefault(setCurrentResume);
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <div>
      <header style={resume.photoAsBG(currentResume)}>
        Goose.
      </header>
      <pre>
        {
          jdmp(currentResume)
        }
      </pre>        
    </div>
  );
}
