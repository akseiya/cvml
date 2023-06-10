import './App.css';

import React, { useEffect, useState } from 'react';

import { resume, YAMLResume } from './Resume';
import { jdmp } from './utils/debug';;

export default function App() {
  const [currentResume, setCurrentResume] = useState({} as YAMLResume);

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
