import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function NestedMarkdown(props:{children: string}) {
  const { children:markdown } = props;
  return <main><ReactMarkdown>
    {markdown.replaceAll(/(^|\s)#+\s/g, (hN) => hN.replace('#', '###'))}
  </ReactMarkdown></main>;
}
