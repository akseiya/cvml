import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { YAMLResume } from './utils/Resume';

export interface SummaryItem {
  [key: string]: string;
};

const renderSummaryItem = (item: SummaryItem) => {
  const [[title, markdown]] = Object.entries(item);
  return (
    <article>
      <header>{title}</header>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      
    </article>
  );
};

export default function Summary(props: { currentResume: YAMLResume }) {
  const { currentResume } = props;
  if (!currentResume.name) {
    return <div/>;
  }
  const { summary } = currentResume;
  return (
    <>
      <h1>Summary</h1>
      {summary.map(renderSummaryItem)}
    </>
  );
};