import React, { useContext } from 'react';
import { FallbackProps } from 'react-error-boundary';

import { PresenterContext } from '../../utils/contexts';
import { nullCallback } from '../../utils/reactHacks';
import { AlertDiv, contactLine, errorBox } from '../AlertDiv';
import { CVMLEditor } from '../CVMLEditor/CVMLEditor';

export function ErrorRecovery(props: FallbackProps) {

  const { error, resetErrorBoundary } = props;

  const presenterData = useContext(PresenterContext);
  if (!presenterData)
    return <AlertDiv>
      <p>It seems the app lost its internal contexts while trying to recover
         from a YAML error:</p>
      {errorBox(error)}
      {contactLine('Please let me know how this happened ')}
    </AlertDiv>;

  const { history } = presenterData;
  if(history.versions.length < 2) return <AlertDiv>
    <p>The app failed to render the default YAML, which means I broke it
       and pushed it, broken, to gitHub pages.</p>
    {errorBox(error)}
    {contactLine('I\'ll be grateful if you send me the error message to ')}
  </AlertDiv>;

  return <>
    <CVMLEditor closeEditor={nullCallback()}/>
    <AlertDiv>
      <p>The app failed to render the resume with your changes.</p>
      <p>Contact me if the error below suggests a bug:</p>
      {errorBox(error)}
      <p>When you return to the editor, your changes will be still present so
         that you can correct them manually and <b>&quot;Apply&quot;</b> the
         new, hopefully valid, resume YAML.</p>
      <p>You can also <b>&quot;Cancel&quot;</b> your recent changes
         immediately and close the editor or <b>&quot;Restore&quot;</b> the last
         valid YAML to the editor window and work from that anew.</p>
      <p>Please take note that after <b>&quot;Restore&quot;</b> there are no
         changes to <b>&quot;Apply&quot;</b> until you make them in the input
         area.</p>
      <p className="button-wrap">
        <button onClick={resetErrorBoundary} type="button">
        OK
        </button>
      </p>
    </AlertDiv></>;
}