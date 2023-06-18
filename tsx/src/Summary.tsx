import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { YAMLResume } from './utils/Resume';

export interface SummaryItem {
  [key: string]: string;
};

const renderSummaryItem = (item: SummaryItem) => {
  const [[title, markdown]] = Object.entries(item);
  return (
    <article key={`summary: ${title}`}>
      <header>{title}</header>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </article>
  );
};

export default function Summary(props: { currentResume: YAMLResume }) {
  const { currentResume: { summary } } = props;
  return (
    <>
      <h1>Summary</h1>
      {(summary ?? []).map(renderSummaryItem)}
    </>
  );
};