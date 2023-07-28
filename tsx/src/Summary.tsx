import React from 'react';

import NestedMarkdown from './utils/NestedMarkdown';
import { YAMLResume } from './utils/Resume';

export interface SummaryItem {
  [key: string]: string;
}

const autoAnchor = (title: string) =>
  title.
    replaceAll(/[\W]/g,'_').replaceAll(/_+/g,'_').toLocaleLowerCase();

export const nestedMarkdown = (markdown: string) => 
  <NestedMarkdown>
    {markdown.replaceAll(/(^|\s)#+\s/g, (hN) => hN.replace('#', '###'))}
  </NestedMarkdown>;

export const renderSummaryItem = (item: SummaryItem) => {
  const [[title, markdown]] = Object.entries(item);
  return (
    <article key={`summary: ${title}`}>
      <a id={autoAnchor(title)}/>
      <header><h2>{title}</h2></header>
      <NestedMarkdown>
        {markdown}
      </NestedMarkdown>
    </article>
  );
};

export default function Summary(props: { currentResume: YAMLResume }) {
  const {
    currentResume: { summary },
  } = props;
  return (
    <>
      <h1>Summary</h1>
      {(summary ?? []).map(renderSummaryItem)}
    </>
  );
}
