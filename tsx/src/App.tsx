import './App.css';

import React, { useEffect, useState } from 'react';
import YAML from 'yaml';

import httpClient from './http/client';
import { jcon } from './utils/debug';

export default function App() {
  const [yaml, setYaml] = useState('');

  useEffect(() => {
    (async () => {
      const response = await httpClient.getDefaultCV(),
        {data} = response,
        resume: object = jcon(YAML.parse(data)) as object;
      setYaml(resume.toString());
    })();
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Goose.
      </header>
      <article>
        {yaml}
      </article>
    </div>
  );
}
