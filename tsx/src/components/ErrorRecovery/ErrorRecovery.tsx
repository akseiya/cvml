/* eslint-disable react/require-default-props */

import React, { useContext } from 'react';

import { PresenterContext } from '../../utils/contexts';
import { AlertDiv } from './AlertDiv';

type OnBtnClick = React.MouseEventHandler<HTMLButtonElement>;

export function ErrorRecovery(error: Error, restoreLastYAML: OnBtnClick) {
  const presenterData = useContext(PresenterContext);
  if (!presenterData)
    return <AlertDiv
      callToAction={['Please let me know how this happened']}
      error={error}
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
      'Clicking "OK" will return to YAML editor with your changes in text.',
      'Using "Restore" in the editor will restore the previous, safe content']}
    error={error}
    preface={[
      'The app failed to render the resume with your changes.',
      'Please let me know if the error below suggests a bug:'
    ]}
  >
    <button onClick={restoreLastYAML} type="button">OK</button>
  </AlertDiv>;
}