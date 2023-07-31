import React from 'react';

import NestedMarkdown from '../../utils/NestedMarkdown';

export interface SummaryItem {
  [key: string]: string;
}

const autoAnchor = (title: string) =>
  title.
    replaceAll(/[\W]/g,'_').replaceAll(/_+/g,'_').toLocaleLowerCase();

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
