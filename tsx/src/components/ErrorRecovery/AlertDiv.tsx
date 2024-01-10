/* eslint-disable react/require-default-props */

import React, { ReactNode } from 'react';

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

  if (error) {
    const { name, message, stack } = error;
    elements.push(
      <>
        <pre key="errornamessage">{name}: {message}</pre>
        <pre key="errorstack">{stack?.split('\n').slice(0,2).join('\n')}</pre>
      </>
    );
  }

  if (ctaWithoutEmail)
    elements.push(...callToAction.map(toParagraphs));
  else {
    const cta = [...callToAction];
    const contactLine = cta.pop();
    elements.push(...cta.map(toParagraphs));
    elements.push(<p key="contact">
      {contactLine}:
      <a href="mailto:akseiya@gmail.com"> akseiya@gmail.com </a>
    </p>);
  }

  return <div role="alert">
    {elements}
    {children}
  </div>;
};
