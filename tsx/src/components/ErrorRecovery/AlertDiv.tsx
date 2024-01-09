/* eslint-disable react/require-default-props */

import React, { ReactNode } from 'react';

import { jdmp } from '../../utils/debug';

type AlertDivProps = {
  readonly preface: string[];
  readonly callToAction: string[];
  readonly error?: Error;
  readonly ctaWithoutEmail?: boolean;
  readonly children?: ReactNode;
}

export function AlertDiv(props: AlertDivProps) {
  const {
    preface, callToAction, error, ctaWithoutEmail, children
  } = props;
  const toParagraphs = (line: string) => <p key={line}>{line}</p>;
  const elements = preface.map(toParagraphs);
  if (error) elements.push(<pre>{jdmp(error)}</pre>);  
  if (ctaWithoutEmail)
    elements.push(...callToAction.map(toParagraphs));
  else {
    const contactLine = callToAction.pop();
    elements.push(...callToAction.map(toParagraphs));
    elements.push(<p>
      {contactLine}:
      <a href="mailto:akseiya@gmail.com">akseiya@gmail.com</a>
    </p>);
  }

  return <div role="alert">
    {elements}
    {children}
  </div>;
};
