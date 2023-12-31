/* eslint-disable react/jsx-no-bind */
import './Career.css';

import React, { useState } from 'react';

import { Job, LinkableName, Resume } from '../../../data/resume';
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

const maxFeaturedJobs = 3;
const minJobsToShow = 3;
const expandedJobsToShow = 3;
const [ msPerHour, hoursADay, daysInYear] = [3600000, 24, 365];
const prehistoryThreshold = msPerHour * hoursADay * daysInYear * 10;

const renderFlattableJob = (flat: boolean, job: Job, i: number) => {
  const [unfolded, setUnfolded] = useState(false);
  const folded = !unfolded && i + 1 > expandedJobsToShow;
  const unfold = () => setUnfolded(true);

  const headingContent = !flat ?
    <header>
      <div className="unfolder" onClick={unfold}>{SVG.doubleChevronDown}</div>
      {nameWithOptionalLink(job.position)}
      <div>{getDuration(job)}</div>
      {nameWithOptionalLink(job.company)}
    </header> :
    <h2>
      {`${getDuration(job)}: ${job.position.name} for ${job.company.name}`}
    </h2>;

  return (
    <article
      className={`job ${ folded ? 'old' : ''}`}
      key={`carrer:${job.id ?? i}`}
    >
      <a className='scrolly' id={`career-${job.id}`} />
      {headingContent}
      <NestedMarkdown>{job.description}</NestedMarkdown>
    </article>
  );
};

const renderJob =
  (flat: boolean) => (job: Job, i: number) => renderFlattableJob(flat, job, i);


const jobsWithFeatureLimit = (jobs: Job[]) => {
  let featuredCount = 0;
  const limitedJobs: Job[] = [];
  for(let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    if(job.featured) {
      featuredCount++;
      if(featuredCount > maxFeaturedJobs) job.featured = false;
    }
    limitedJobs.push(job);
  };
  return limitedJobs;
};

const jobFeaturedOrNewer = (job1: Job, job2: Job) => {
  if(job1.featured && !job2.featured) return -1;
  if(!job1.featured && job2.featured) return 1;
  return new Date(job2.from).valueOf() - new Date(job1.from).valueOf();
};

const notPrehistoric = (job: Job, jobIndex: number) =>
  !('to' in job) ||               // current assignment
  (jobIndex < minJobsToShow) ||   // one of the first on sorted list
  (Date.now() - new Date(job.from).valueOf() < prehistoryThreshold);

export function Career(props: {
  currentResume: Resume,
  layoutIsFlat: boolean
}) {
  const { currentResume, layoutIsFlat } = props;
  const { career } = currentResume;
  const { jobs } = career ?? {};

  // const chronologically = (job1: Job, job2: Job) =>
  //   new Date(job2.from).valueOf() - new Date(job1.from).valueOf();

  return (
    <>
      <h1>Career</h1>
      {(jobsWithFeatureLimit(jobs) ?? [])
        .sort(jobFeaturedOrNewer)
        .filter(notPrehistoric)
        .map(renderJob(layoutIsFlat))}
    </>
  );
}
