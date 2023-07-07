import './Career.css';

import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { YAMLResume } from './utils/Resume';
import { LinkableName } from './utils/sharedTypes';

export interface Job {
  id: string;
  from: string;
  to?: string;
  position: LinkableName;
  company: LinkableName;
  description: string;
};

const fuzzDate = (dateSpec: string) => {
  const precision = dateSpec.split('-').length - 1;
  const date = new Date(dateSpec);
  const month = date.toDateString().split(' ')[1];
  if(precision < 1) return dateSpec;
  if(precision < 2) return `${month} ${date.getFullYear()}`;
  return date.toISOString().split('T')[0];
};

const getDuration = (job: Job) => {
  const { from, to } = job;
  if(!to) return `since ${fuzzDate(from)}`;
  return `${fuzzDate(from)} - ${fuzzDate(to)}`;
};

const nameWithOptionalLink = (linkable?: LinkableName) => {
  if(!linkable) return ' ';
  if(!linkable.link) return (<div>{linkable.name}</div>);
  return (<div><a href={linkable.link}>{linkable.name}</a></div>);
};

const renderJob = (job: Job) => {
  return (
    <article className="job" key={`carrer:${job.id ?? Math.random()}`}>
      <header>
        <div>{getDuration(job)}</div>
        {nameWithOptionalLink(job.company)}
        {nameWithOptionalLink(job.position)}
      </header>
      <ReactMarkdown>{job.description}</ReactMarkdown>      
    </article>
  );
};

export default function Career(props: { currentResume: YAMLResume }) {
  const { currentResume } = props;
  const { career }  = currentResume;
  const { jobs } = career ?? {};
  return (
    <>
      <h1>Career</h1>
      {(jobs ?? []).map(renderJob)}
    </>
  );
};