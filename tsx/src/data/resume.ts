import React from 'react';

export type SummaryItem = {
  [key: string]: string;
}

export type LinkableName = {
  name:   string;
  link?:  string;
}

export type Job = {
  id:   string;
  featured?: boolean;
  to?:  string;
  from: string;
  company:  LinkableName;
  position: LinkableName;
  description:  string;
}

type ResumePhoto = {
  base64: string;
  width:  string;
  height: string;
  type:   string;
}

export type Resume = {
  name:   string;
  email?: string;
  photo?: ResumePhoto;
  summary:  SummaryItem[];
  projects: SummaryItem[];
  extras:   SummaryItem[];
  fundamentals: {
    [key: string]: string;
  };
  career: {
    title?: string;
    jobs: Job[];
  };
}

export const photoAsBackground = (resume: Resume): React.CSSProperties => {
  const { photo } = resume;
  if (!photo) return {};
  const { width, height, type, base64 } = photo;
  const flatB64 = base64.replaceAll(/\n/g,'');
  const dataURL = `data:${type};base64,${flatB64}`;
  return {
    width, height,
    backgroundImage: `url('${dataURL}')`
  };
};
