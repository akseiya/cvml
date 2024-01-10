/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useContext, useState } from 'react';

import { JobSpec, LinkableName } from '../../../data/resume';
import { PresenterContext } from '../../../utils/contexts';
import { SVG } from '../../../utils/svg';
import NestedMarkdown from '../NestedMarkdown';

const fuzzDate = (dateSpec: string) => {
  const dateStr = dateSpec.toString();
  const precision = dateStr.split('-').length - 1;
  if (precision < 1) return dateStr;
  // Full YYYY-MM-DD dates are not really so super
  // readable, so let's ignore the days even if it
  // shortens my own Schroders gig by 30%.
  // Future: for gigs inside a year, a format like
  // YYYY Mmm DD - Mmm DD could be used
  const date = new Date(dateStr);
  const month = date.toDateString().split(' ')[1];
  return `${month} ${date.getFullYear()}`;
};

const getDuration = (job: JobSpec) => {
  const { from, to } = job;
  if (!to) return `since ${fuzzDate(from)}`;
  return `${fuzzDate(from)} - ${fuzzDate(to)}`;
};

const nameWithOptionalLink = (linkable?: LinkableName) => {
  if (!linkable) return ' ';
  if (!linkable.link) return <div>{linkable.name}</div>;
  return (
    <div>
      <a href={linkable.link}>{linkable.name}</a>
    </div>
  );
};

export type InitialJobState = 'unfolded' | 'folded' | 'hidden';
type JobProps = {
    readonly job: JobSpec,
    readonly initialState: InitialJobState
}

export function Job(props: JobProps) {
  const { job, initialState } = props;
  if(initialState === 'hidden') return null;

  const [unfolded, setUnfolded] = useState(initialState === 'unfolded');
  const unfold = useCallback(
    () => setUnfolded(true),
    [setUnfolded]
  );  
  
  const presenterData = useContext(PresenterContext);
  if (!presenterData) throw 'Trying to render Career without resume data';
  const { flags: { flatView } } = presenterData;

  const headingContent = !flatView ?
    <header>
      <div className="unfolder" onClick={unfold}>{SVG.doubleChevronDown}</div>
      {nameWithOptionalLink(job.position)}
      <div>{getDuration(job)}</div>
      {nameWithOptionalLink(job.company)}
    </header>
    :
    <h2>
      {`${getDuration(job)}: ${job.position.name} for ${job.company.name}`}
    </h2>;

  const jobId = job.id || new Date(job.from).valueOf();
  const joblistKey = `career:${jobId}`;
  
  return (
    <article
      className={`job ${ unfolded ? '' : 'folded'}`}
      key={joblistKey}
    >
      <a className='scrolly' id={`career-${jobId}`} />
      {headingContent}
      <NestedMarkdown>{job.description}</NestedMarkdown>
    </article>
  );
}