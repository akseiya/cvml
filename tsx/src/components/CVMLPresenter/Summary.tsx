import React from 'react';

import { SummaryItem } from '../../data/resume';
import NestedMarkdown from './NestedMarkdown';

const autoAnchor = (title: string) =>
  title.
    replaceAll(/[\W]/g,'_').replaceAll(/_+/g,'_').toLocaleLowerCase();

const renderSummaryItem = (item: SummaryItem) => {
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

type PanelSetProps = {
  readonly title: string;
  readonly anchor: string;
  readonly panelsData: SummaryItem[] | null;
}
export function PanelSet(props: PanelSetProps) {
  const { title, anchor, panelsData } = props;
  if (!panelsData) return null;
  return (<>
    <a id={ anchor }/>
    <h1>{ title }</h1>
    { panelsData.map(renderSummaryItem) }
  </>
  );

}