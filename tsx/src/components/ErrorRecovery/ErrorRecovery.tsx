/* eslint-disable react/require-default-props */

import React, { useContext } from 'react';
import { FallbackProps } from 'react-error-boundary';

import { PresenterContext } from '../../utils/contexts';
import { AlertDiv } from './AlertDiv';

export function ErrorRecovery(props: FallbackProps) {

  const { error, resetErrorBoundary } = props;

  const presenterData = useContext(PresenterContext);
  if (!presenterData)
    return <AlertDiv
      callToAction={['Please let me know how this happened']}
      error={error.message}
      preface={[`It seems the app lost its internal contexts while trying
                 to recover from a YAML error:`]}
    />;  

  const { history } = presenterData;
  if(history.versions.length < 2) return <AlertDiv
    callToAction={['I\'ll be grateful if you send me the error message']}
    error={error}
    preface={[`The app failed to render the default YAML, which means I broke it
               and pushed it, broken, to gitHub pages.`]}
  />; 

  return <AlertDiv
    callToAction={[
      'Clicking "OK" will restore the rendered YAML to last safe version.',
      `Opening the editor will load your newest version and allow you
       to modify it or "Restore" to the last safe version`
    ]}
    ctaWithoutEmail
    error={error}
    preface={[
      'The app failed to render the resume with your changes.',
      'Contact me if the error below suggests a bug:'
    ]}
  >
    <button onClick={resetErrorBoundary} type="button">OK</button>
  </AlertDiv>;
}