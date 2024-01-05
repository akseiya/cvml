import './Career.css';

import React, { useCallback, useContext, useState } from 'react';

import { ResumeHistory } from '../../../data';
import { JobSpec } from '../../../data/resume';
import { PresenterContext } from '../../../utils/contexts';
import { SVG } from '../../../utils/svg';
import { InitialJobState, Job } from './Job';

const unfoldedJobsToShow = 3;

const jobsChronology = (job1: JobSpec, job2: JobSpec) =>
  new Date(job2.from).valueOf() - new Date(job1.from).valueOf();

const millisecondsPerYear = 31556952000;
const historyYears = 10;
const isPrehistoricJob = (job: JobSpec) =>
  (Date.now() - new Date(job.to ? job.to : job.from).valueOf()) >
    historyYears * millisecondsPerYear;

export function Career() {
  const presenterData = useContext(PresenterContext);
  if (!presenterData) throw 'Trying to render Career without resume data';
  const { history, flags: {flatView} } = presenterData;
  const currentResume = ResumeHistory.parseCurrent(history);

  if(!('career' in currentResume)) return null;
  const { career: {jobs} } = currentResume;
  const renderedJobs = [];

  const [ hidePrehistory, setHidePrehistory ] = useState(true);

  const showPrehistory = useCallback(
    () => setHidePrehistory(false),
    [setHidePrehistory]
  );

  const jobHistory = jobs.slice().sort(jobsChronology);
  const featuredJobsCount = jobHistory.filter(
    (job: JobSpec) => !!job.featured
  ).length;

  let prehistoricJobsHidden = false;
  let jobsToUnfoldByRecency = unfoldedJobsToShow;
  let jobsToUnfoldByFeature = Math.max(unfoldedJobsToShow, featuredJobsCount);

  jobsToUnfoldByRecency = jobsToUnfoldByRecency - jobsToUnfoldByFeature;
  for(const job of jobHistory) {
    let initialState:InitialJobState = 'folded';
    if(job.featured) {
      if(jobsToUnfoldByFeature > 0) {
        initialState = 'unfolded';
        jobsToUnfoldByFeature--;
      }
    } else {
      if(jobsToUnfoldByRecency > 0) {
        initialState = 'unfolded';
        jobsToUnfoldByRecency--;
      } else {
        if(hidePrehistory && isPrehistoricJob(job)) {
          initialState = 'hidden';
          prehistoricJobsHidden = true;
        }
      }
    };
    renderedJobs.push(<Job initialState={initialState} job={job} />);
  };

  const showPrehistoryButton = !prehistoricJobsHidden || flatView ? null :
    <div className="prehistory-button round-border"
      onClick={showPrehistory}
    >
      <div>{SVG.doubleChevronDown}</div>
      Over {historyYears} years ago...
    </div>;

  return (
    <>
      <h1>Career</h1>
      {renderedJobs}
      {showPrehistoryButton}
    </>
  );
}
