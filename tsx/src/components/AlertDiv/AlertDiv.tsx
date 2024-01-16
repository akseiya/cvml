import './AlertDiv.css';

import React, { ReactNode } from 'react';

export const contactLine = (cta: string) => <p key="contact-line">
  {cta}
  <a href="mailto:akseiya@gmail.com"> akseiya@gmail.com </a>
</p>;

export const errorBox = (error: Error) =>
  <pre key="error-name">{error.name}: {error.message + '\n\n'}
    {error.stack?.split('\n').slice(0,2).join('\n')}
  </pre>;

export function AlertDiv(props: {readonly children: ReactNode}) {
  const { children } = props;

  return <>
    <div />
    <div id="modal-bg" />
    <div className='drop-shadow' role="alert">
      {children}
    </div>
  </>;
};
