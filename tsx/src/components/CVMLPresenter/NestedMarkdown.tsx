import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

/*
The resume is supposed to be easily pasteable into an office writer
app. Smart ones like LibreOffice Writer actually keep the headers'
hierarchy, so to avoid a situation where "2003-2010 NASA" is a <h2>
but the "# Asteroids found" MD header inside is a <h1>, all MD
headers get downgraded to one level below the expected H-level of
the panel's title.
*/
export default function NestedMarkdown(props:{readonly children: string}) {
  const { children:markdown } = props;
  return <main><ReactMarkdown>
    {markdown.replaceAll(/(^|\s)#+\s/g, (hN) => hN.replace('#', '###'))}
  </ReactMarkdown></main>;
}
