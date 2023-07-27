/* eslint-disable react/jsx-no-bind */
import './Career.css';

import React, { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { doubleChevronDown } from './utils/DrawShape';
import { YAMLResume } from './utils/Resume';
import { LinkableName } from './utils/sharedTypes';

export interface Job {
  id: string;
  from: string;
  to?: string;
  position: LinkableName;
  company: LinkableName;
  description: string;
}

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

const getDuration = (job: Job) => {
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

const feshJobsNumber = 3;

const renderJob = (job: Job, i: number) => {
  const [unfolded, setUnfolded] = useState(false);
  const folded = !unfolded && i + 1 > feshJobsNumber;
  const unfold = () => setUnfolded(true);
  return (
    <article
      className={`job ${ folded ? 'old' : ''}`}
      key={`carrer:${job.id ?? i}`}
    >
      <a className='scrolly' id={`career-${job.id}`} />
      <header>
        <div className="unfolder" onClick={unfold}>{doubleChevronDown()}</div>
        <div>{getDuration(job)}</div>
        {nameWithOptionalLink(job.company)}
        {nameWithOptionalLink(job.position)}
      </header>
      <main><ReactMarkdown>{job.description}</ReactMarkdown></main>
    </article>
  );
};


export default function Career(props: { currentResume: YAMLResume }) {
  const { currentResume } = props;
  const { career } = currentResume;
  const { jobs } = career ?? {};

  const chronologically = (job1: Job, job2: Job) =>
    new Date(job2.from).valueOf() - new Date(job1.from).valueOf();

  return (
    <>
      <h1>Career</h1>
      {(jobs ?? [])
        .sort(chronologically)
        .map(renderJob)}
    </>
  );
}
